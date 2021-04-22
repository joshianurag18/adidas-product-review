const TENANT_CONFIG = {
  SOCL: {
    STATE: "MUNICIPAL"
  },
  SOPE: {
    STATE: "CITY",
    CITY: "MUNICIPAL"
  }
};

const KEY_ALREADY_EXIST = "value for 'key' already exists";
const KEY_DOES_NOT_EXIST = "value for 'key' does not exists";
const SPACE_NOT_ALLOWED = "Invalid value: 'must not include spaces'";
const DB_ERRORS = {
  23503: "Invalid value"
};

const FACILITY = {
  NAME: "facility",
  COLUMNS: {
    ID: "id",
    FACILITY_ID: "facility_id",
    NAME: "name",
    ADDRESS_NAME: "address_name",
    ADDRESS_LINE1: "address_line1",
    ADDRESS_LINE2: "address_line2",
    ADDRESS_LINE3: "address_line3",
    COUNTRY_CODE: "country_code",
    STATE_CODE: "state_code",
    CITY_CODE: "city_code",
    MUNICIPAL_CODE: "municipal_code",
    COUNTRY_NAME: "country_name",
    STATE_NAME: "state_name",
    CITY_NAME: "city_name",
    MUNICIPAL_NAME: "municipal_name",
    TYPE: "type",
    OPERATOR: "operator",
    WORKING_HOURS: "working_hours",
    WORKING_DAYS: "working_days",
    ICON_URL: "icon_url",
    GOOLGE_ADDRESS: "google_address",
    LAT: "latitude",
    LONG: "longitude",
    CUSTOM_INFO: "custom_info",
    TENANT_ID: "tenant_id",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    UPDATED_AT: "updated_at",
    UPDATED_BY: "updated_by",
    DELETED_AT: "deleted_at",
    IS_ACTIVE: "is_active"
  }
};

const STATE = {
  NAME: "state",
  COLUMNS: {
    ID: "id",
    TENANT_ID: "tenant_id",
    COUNTRY_ID: "country_id",
    CODE: "code",
    NAME: "name",
    LAT: "latitude",
    LONG: "longitude",
    CUSTOM_INFO: "custom_info",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    UPDATED_AT: "updated_at",
    UPDATED_BY: "updated_by",
    DELETED_AT: "deleted_at"
  }
};

const CITY = {
  NAME: "city",
  COLUMNS: {
    ID: "id",
    TENANT_ID: "tenant_id",
    STATE_ID: "state_id",
    CODE: "code",
    NAME: "name",
    LAT: "latitude",
    LONG: "longitude",
    CUSTOM_INFO: "custom_info",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    UPDATED_AT: "updated_at",
    UPDATED_BY: "updated_by",
    DELETED_AT: "deleted_at"
  }
};

const MUNICIPAL = {
  NAME: "municipal",
  COLUMNS: {
    ID: "id",
    TENANT_ID: "tenant_id",
    STATE_ID: "state_id",
    CITY_ID: "city_id",
    CODE: "code",
    NAME: "name",
    LAT: "latitude",
    LONG: "longitude",
    POLYGON: "polygon",
    CUSTOM_INFO: "custom_info",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    UPDATED_AT: "updated_at",
    UPDATED_BY: "updated_by",
    DELETED_AT: "deleted_at"
  }
};

const DOMAIN_LINK = "https://osmos.services";

const CUSTOM_AJV_VALIDATION_ERROR = "CUSTOM_AJV_VALIDATION_ERROR";

module.exports = {
  FACILITY,
  STATE,
  CITY,
  MUNICIPAL,
  KEY_ALREADY_EXIST,
  KEY_DOES_NOT_EXIST,
  DB_ERRORS,
  SPACE_NOT_ALLOWED,
  TENANT_CONFIG,
  DOMAIN_LINK,
  CUSTOM_AJV_VALIDATION_ERROR
};
