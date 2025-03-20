import cron from "node-cron";
import { prismaClient } from "./database";
import { logger } from "./logger";
import { clearSessioQueue } from "./queue";

export const setupCronJobs = (time: string) => {
  const [hours, minutes] = time.split(":");

  cron.schedule(
    `${minutes} ${hours} * * *`,
    async () => {
      try {
        const reportDetailResult = await prismaClient.reportDetail.deleteMany({});
        const reportResult = await prismaClient.report.deleteMany({});
        clearSessioQueue();
        logger.info({
          message: `Report Detail Clear ${reportDetailResult.count} Data At ${time}`,
        });
        logger.info({
          message: `Report Clear ${reportResult.count} Data At ${time}`,
        });
        logger.info({
          message: `Queue Session Has Been Cleared`,
        });
      } catch (e: any) {
        logger.error({
          message: e,
        });
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Jakarta",
    }
  );
};
