import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OpenaqService } from './openaq.service';

@Controller('openaq')
export class OpenaqController {
  constructor(private readonly openaqService: OpenaqService) {}

  @Get('location')
  async getAirQualityByLocation(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    if (!lat || !lng) {
      throw new BadRequestException('Latitude and Longitude are required!');
    }

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    // Dynamic service call
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const extractedData = await this.openaqService.fetchDynamicAirQuality(
      parsedLat,
      parsedLng,
    );

    return {
      success: true,
      message: `Data extracted successfully for Lat: ${lat}, Lng: ${lng}`,
      data: extractedData as Record<string, unknown>,
    };
  }
}
