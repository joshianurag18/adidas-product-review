exports.connectionCheck = db => db.raw("select 1+1 as result");
