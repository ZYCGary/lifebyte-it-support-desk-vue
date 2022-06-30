import appApis from '@/http/apis/app.apis'
import userApis from '@/http/apis/user.apis'
import authApis from '@/http/apis/auth.apis'
import locationApis from '@/http/apis/location.apis'
import hardwareApis from '@/http/apis/hardware.apis'

export default {
  app: appApis,
  auth: authApis,
  user: userApis,
  location: locationApis,
  hardware: hardwareApis
}
