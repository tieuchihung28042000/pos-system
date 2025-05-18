"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building, MapPin, Phone, Mail, Globe, Clock, CreditCard, Printer, Save, Upload } from "lucide-react"

export default function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState({
    name: "FoodPOS Coffee",
    address: "123 Nguyễn Huệ, Quận 1",
    city: "TP.HCM",
    phone: "028 1234 5678",
    email: "contact@foodpos.vn",
    website: "foodpos.vn",
    taxCode: "0123456789",
    openingHours: "07:00 - 22:00",
    logo: "/placeholder.svg?height=100&width=100",
  })

  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Giả lập lưu dữ liệu
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6 fade-in">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt hệ thống</h1>
        <p className="text-muted-foreground">Quản lý thông tin cửa hàng và cấu hình hệ thống</p>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store">Thông tin cửa hàng</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="receipt">Hóa đơn & In ấn</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Thông tin cơ bản về cửa hàng của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Tên cửa hàng</Label>
                    <div className="relative">
                      <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Nhập tên cửa hàng"
                        className="pl-8"
                        value={storeInfo.name}
                        onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="Nhập địa chỉ cửa hàng"
                        className="pl-8"
                        value={storeInfo.address}
                        onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="city">Thành phố</Label>
                      <Input
                        id="city"
                        placeholder="Nhập thành phố"
                        value={storeInfo.city}
                        onChange={(e) => setStoreInfo({ ...storeInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="taxCode">Mã số thuế</Label>
                      <Input
                        id="taxCode"
                        placeholder="Nhập mã số thuế"
                        value={storeInfo.taxCode}
                        onChange={(e) => setStoreInfo({ ...storeInfo, taxCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                    <img
                      src={storeInfo.logo || "/placeholder.svg"}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Tải logo lên
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Thông tin liên hệ của cửa hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      className="pl-8"
                      value={storeInfo.phone}
                      onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="Nhập email"
                      className="pl-8"
                      value={storeInfo.email}
                      onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="Nhập website"
                      className="pl-8"
                      value={storeInfo.website}
                      onChange={(e) => setStoreInfo({ ...storeInfo, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="openingHours">Giờ mở cửa</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="openingHours"
                      placeholder="Ví dụ: 07:00 - 22:00"
                      className="pl-8"
                      value={storeInfo.openingHours}
                      onChange={(e) => setStoreInfo({ ...storeInfo, openingHours: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu thông tin
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Quản lý các phương thức thanh toán được chấp nhận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tiền mặt</p>
                      <p className="text-sm text-muted-foreground">Thanh toán bằng tiền mặt tại quầy</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Thẻ ngân hàng</p>
                      <p className="text-sm text-muted-foreground">Thanh toán bằng thẻ ATM, Visa, Mastercard</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ví điện tử</p>
                      <p className="text-sm text-muted-foreground">Thanh toán qua Momo, ZaloPay, VNPay</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-muted-foreground">Thanh toán bằng chuyển khoản</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Cấu hình thanh toán</CardTitle>
              <CardDescription>Thiết lập cấu hình cho các phương thức thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                  <Select defaultValue="vnd">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vnd">VND - Việt Nam Đồng</SelectItem>
                      <SelectItem value="usd">USD - Đô la Mỹ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="taxRate">Thuế suất (%)</Label>
                  <Input id="taxRate" placeholder="Nhập thuế suất" defaultValue="10" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu cấu hình
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="receipt" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Cấu hình hóa đơn</CardTitle>
              <CardDescription>Thiết lập thông tin hiển thị trên hóa đơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="receiptHeader">Tiêu đề hóa đơn</Label>
                <Input id="receiptHeader" placeholder="Nhập tiêu đề hóa đơn" defaultValue="FoodPOS Coffee" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="receiptFooter">Chân trang hóa đơn</Label>
                <Textarea
                  id="receiptFooter"
                  placeholder="Nhập chân trang hóa đơn"
                  defaultValue="Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showLogo" defaultChecked />
                <Label htmlFor="showLogo">Hiển thị logo trên hóa đơn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showTax" defaultChecked />
                <Label htmlFor="showTax">Hiển thị thông tin thuế</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Cấu hình máy in</CardTitle>
              <CardDescription>Thiết lập cấu hình cho máy in hóa đơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="printerName">Tên máy in</Label>
                  <div className="relative">
                    <Printer className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="printerName"
                      placeholder="Nhập tên máy in"
                      className="pl-8"
                      defaultValue="EPSON TM-T82"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="paperSize">Kích thước giấy</Label>
                  <Select defaultValue="80mm">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kích thước giấy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="58mm">58mm</SelectItem>
                      <SelectItem value="80mm">80mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="autoPrint" defaultChecked />
                <Label htmlFor="autoPrint">Tự động in hóa đơn sau khi thanh toán</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="printDuplicate" />
                <Label htmlFor="printDuplicate">In hóa đơn thành hai bản</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Printer className="mr-2 h-4 w-4" />
                In thử
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu cấu hình
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
              <CardDescription>Thiết lập cấu hình chung cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">Tiếng Anh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select defaultValue="asia_ho_chi_minh">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn múi giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia_ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                      <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="darkMode" />
                <Label htmlFor="darkMode">Chế độ tối</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Bật thông báo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="autoBackup" defaultChecked />
                <Label htmlFor="autoBackup">Tự động sao lưu dữ liệu hàng ngày</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>Thiết lập cấu hình bảo mật cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="twoFactor" />
                <Label htmlFor="twoFactor">Bật xác thực hai yếu tố</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sessionTimeout" defaultChecked />
                <Label htmlFor="sessionTimeout">Tự động đăng xuất sau 30 phút không hoạt động</Label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="passwordPolicy">Chính sách mật khẩu</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chính sách mật khẩu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Cơ bản (ít nhất 6 ký tự)</SelectItem>
                    <SelectItem value="medium">Trung bình (ít nhất 8 ký tự, bao gồm chữ và số)</SelectItem>
                    <SelectItem value="high">
                      Cao (ít nhất 10 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu cấu hình
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
