import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenaqService {
  private readonly logger = new Logger(OpenaqService.name);

  constructor(private readonly httpService: HttpService) {}

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
}
