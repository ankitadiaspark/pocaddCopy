

module.exports.allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', getOriginDomain(req));
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Referer,Origin,Authorization,Content-Length,X-Requested-With,X-Prototype-Version,Cache-Control,Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method == 'OPTIONS') res.end();
  else next();
};

function getOriginDomain(req) {
  if (req.headers && req.headers.origin)
    return req.headers.origin;

  var protocol = "https://";
  if (req.headers.referer) {
    var index = req.headers.referer.indexOf('/');
    index = req.headers.referer.indexOf('/', index + 2);
    return req.headers.referer.substring(0, index);
  }
  return "http://localhost";
}