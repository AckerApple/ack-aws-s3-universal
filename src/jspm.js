import s3ec from "./s3-encryption-client"

import "aws-sdk-js/aws-sdk"
import crypto from "crypto"
import Buff from "buffer"

export default s3ec(AWS, crypto, Buff.Buffer)