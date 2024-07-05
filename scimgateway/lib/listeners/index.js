const { apiListeners } = require("./data/api");
const { kafkaListeners } = require("./data/kafka");

const { useApiListener } = require("./functions/api");
const { useKafkaListener } = require("./functions/kafka");
const { getCacheInfo } = require("../utils/getCacheInfo");
const { formatAuth } = require("../utils/formatAuth");

async function useListeners(endpointMapper, auth, map, caches) {
  const listeners = [
    ...(apiListeners?.map((item) => ({ ...item, listenerType: "api" })) || []),
    ...(kafkaListeners?.map((item) => ({ ...item, listenerType: "kafka" })) ||
      []),
  ].sort((a, b) => a.position - b.position);

  for (const item of listeners) {
    const formattedItem = await getCacheInfo(item, caches, item.port);

    const selectedAuth = [
      ...auth.basic?.map((item) => ({ ...item, type: "basic" })),
      ...auth.bearerToken?.map((item) => ({ ...item, type: "bearer" })),
      ...auth.bearerOAuth?.map((item) => ({ ...item, type: "oauth2" })),
    ]?.filter((item) => !item.readOnly)[0];

    if (!selectedAuth) {
      console.error("No valid authentication method provided for listener");
    }

    try {
      let formattedAuth = (
        await formatAuth(
          await getCacheInfo(selectedAuth, caches, item.port),
          `http://localhost:${item.port}`
        )
      ).token;

      switch (item.listenerType) {
        case "api":
          await useApiListener(
            formattedItem,
            formattedAuth,
            endpointMapper,
            map
          );
          break;
        case "kafka":
          await useKafkaListener(
            formattedItem,
            formattedAuth,
            endpointMapper,
            map
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(`Error using listener ${item.listenerType}: ${error}`);

      if (item.on_error) {
        function executeScript(obj) {
          return eval?.(`"use strict";(${obj})`);
        }
        executeScript(item.on_error);
      }
    }
  }
}

module.exports = { useListeners };
