exports.getAuditInfo = entity => {
  const { audit } = entity;
  const currentTimeStamp = new Date(Date.now()).toISOString();
  const obj = {
    createdAt: currentTimeStamp,
    updatedAt: currentTimeStamp
  };
  if (!audit) {
    return obj;
  }
  const { createdBy, updatedBy } = audit;
  return {
    ...(createdBy && { createdBy }),
    ...(updatedBy && { updatedBy }),
    ...obj
  };
};

exports.connectionCheck = db => db.raw("select 1+1 as result");
