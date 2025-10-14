export function success(res, data, message = "OK", status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function error(res, code, message, status = 400) {
  return res.status(status).json({
    success: false,
    error: { code, message },
  });
}
