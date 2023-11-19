export interface LogData {
  level: string
  message: string
  resourceId: string
  timestamp: string
  traceId: string
  spanId: string
  commit: string
  metadata: Metadata
}

interface Metadata {
  parentResourceId: string
}
