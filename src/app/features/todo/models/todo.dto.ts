export interface TodoLocationInfoDto {
  generationtime_ms: number;
  results?: TodoLocationResultDto[];
}

export interface TodoLocationResultDto {
  latitude: number;
  longitude: number;
}

export interface TodoLocationTemperatureDto {
  current: {
    temperature_2m: number;
  }
}
