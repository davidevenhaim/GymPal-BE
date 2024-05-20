import { HttpStatus } from '@nestjs/common';

const str: string = 'string';

export interface iServerResponse {
  status: HttpStatus;
  data?: any;
  msg?: string | object;
}

// TODO: Use httpstatus enum instaed of "servceCode" enum
export enum ServerCode {
  Ok = 0,
  Err = -1,
}

export const getNewServerResponse = (): iServerResponse => {
  return {
    msg: 'OK',
    code: ServerCode.Ok,
    status: HttpStatus.CREATED,
  } as iServerResponse;
};

export const serverResponseErr = (
  res: iServerResponse,
  data: { msg?: string | object; data?: any; status?: number },
) => {
  res.status = res.status || HttpStatus.INTERNAL_SERVER_ERROR;
  res.data = data.data || undefined;
  res.msg = data.msg || 'Server Error';
};

export const getErrLogMsg = (
  status: HttpStatus,
  msg?: string | object,
): string => {
  return `Server responded with status code ${status}. 
  ${
    msg && typeof msg === typeof str
      ? `With error message: ${msg}`
      : 'With no extra eror message. probably an internal server error.'
  }
    `;
};
