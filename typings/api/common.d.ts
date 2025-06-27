type RequestOptions = Omit<
  WechatMiniprogram.RequestOption,
  "url" | "method" | "data"
> & {
  query?: string | WechatMiniprogram.IAnyObject | ArrayBuffer;
};
