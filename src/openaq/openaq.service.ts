import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OpenaqService {
  private readonly logger = new Logger(OpenaqService.name);

  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  // Ab ye function strictly lat aur lng accept karega
  async fetchDynamicAirQuality(lat: number, lng: number) {
    this.logger.log(
      `Fetching live pollution data for Lat: ${lat}, Lng: ${lng}...`,
    );

    try {
      // Hardcoded values ki jagah ab arguments use honge
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,carbon_monoxide&timezone=Asia/Kolkata`;

      const response = await firstValueFrom(this.httpService.get(url));

      this.logger.log('Success! Received live telemetry data.');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('API call failed', error.message);
      } else {
        this.logger.error('API call failed', String(error));
      }
    }
  }

  // cronJob delete data at 9 AM

  @Cron('0 9 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async handleDailyDataBaseCleanUp() {
    this.logger.log('Starting Daily DataBase CleanUp At 9 AM...');
    try {
      // 1. Pehle saari readings delete karo
      const readingResult = await this.prisma.airQualityReading.deleteMany({});

      // 2. Phir saari locations delete karo (Optional: agar aap locations rakhna chahte hain toh is line ko hata sakte hain)
      const locationResult = await this.prisma.sensorLocation.deleteMany({});

      this.logger.log(
        `CleanUp SuccessFul! Deleted ${readingResult.count} Readings & ${locationResult.count} Locations.`,
      );
    } catch (error) {
      this.logger.error('Failed to clean database', error);
    }
  }
}
