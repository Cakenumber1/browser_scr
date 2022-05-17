export const url = 'https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze';

export const body = (encoded: string) => {
  return {
    'folderId': process.env.NEXT_PUBLIC_FOLDER,
    'analyze_specs': [{
      'content': encoded,
      'features': [{
        'type': 'TEXT_DETECTION',
        'text_detection_config': {
          'language_codes': ['*']
        }
      }]
    }]
  };
};

export const config = {
  headers: {
    'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_IAM_TOKEN,
  }
}

export type resType = {
  id: string,
  img: string,
  words?: string[],
};
