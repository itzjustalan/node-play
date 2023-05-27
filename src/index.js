import { app_with_clusters, app_with_clusters_2 } from "./clusters/index.js";
import { app_with_worker_threads } from "./worker_threads/index.js";
import { app_with_events } from "./events/index.js";
import { app_with_urls } from "./url/index.js";
import { app_with_http_server } from "./http/index.js";
import {
  app_with_exec,
  app_with_exec_file,
  app_with_fork,
  app_with_spawn,
} from "./child_process/index.js";

export const run_apps = async () => {
  console.log("\n\napp started!\n\n");
  const start_time = performance.now();

  //   app_with_worker_threads();
  //   app_with_clusters();
  //   app_with_clusters_2();
  //   app_with_events();
  //   app_with_urls();
  //   app_with_http_server();
  //   app_with_exec();
  //   app_with_exec_file();
  //   app_with_spawn();
  app_with_fork();

  //  spawn v fork

  console.log("\n\napp took:", performance.now() - start_time, "ms\n\n");
};
