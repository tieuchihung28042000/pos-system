"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Database, Shield, Bell, RefreshCw, Download, Upload, HardDrive } from "lucide-react"

export default function SystemSettingsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Thiết lập hệ thống</h1>
        <p className="text-muted-foreground">Quản lý cấu hình và bảo mật hệ thống</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Cấu hình chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Phục hồi</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Cấu hình chung</CardTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dateFormat">Định dạng ngày</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="timeFormat">Định dạng giờ</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 giờ</SelectItem>
                      <SelectItem value="12h">12 giờ (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Bật thông báo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="autoUpdate" defaultChecked />
                <Label htmlFor="autoUpdate">Tự động cập nhật phần mềm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="analytics" defaultChecked />
                <Label htmlFor="analytics">Gửi dữ liệu phân tích ẩn danh để cải thiện dịch vụ</Label>
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

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Cấu hình cơ sở dữ liệu</CardTitle>
              <CardDescription>Thiết lập cấu hình cho cơ sở dữ liệu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dbHost">Máy chủ</Label>
                  <div className="relative">
                    <Database className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="dbHost" placeholder="Nhập địa chỉ máy chủ" className="pl-8" defaultValue="localhost" />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dbPort">Cổng</Label>
                  <Input id="dbPort" placeholder="Nhập cổng" defaultValue="3306" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dbName">Tên cơ sở dữ liệu</Label>
                  <Input id="dbName" placeholder="Nhập tên cơ sở dữ liệu" defaultValue="foodpos_db" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dbUser">Tên người dùng</Label>
                  <Input id="dbUser" placeholder="Nhập tên người dùng" defaultValue="root" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dbAutoBackup" defaultChecked />
                <Label htmlFor="dbAutoBackup">Tự động sao lưu cơ sở dữ liệu hàng ngày</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dbOptimize" defaultChecked />
                <Label htmlFor="dbOptimize">Tự động tối ưu hóa cơ sở dữ liệu hàng tuần</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                Kiểm tra kết nối
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

        <TabsContent value="security" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
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
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="loginAttempts">Số lần đăng nhập thất bại tối đa</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn số lần đăng nhập thất bại tối đa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 lần</SelectItem>
                    <SelectItem value="5">5 lần</SelectItem>
                    <SelectItem value="10">10 lần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ipRestriction" />
                <Label htmlFor="ipRestriction">Giới hạn truy cập theo địa chỉ IP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="securityLog" defaultChecked />
                <Label htmlFor="securityLog">Ghi nhật ký bảo mật</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Lưu cấu hình bảo mật
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Thông báo bảo mật</CardTitle>
              <CardDescription>Thiết lập cấu hình thông báo bảo mật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="loginNotification" defaultChecked />
                <Label htmlFor="loginNotification">Thông báo khi có đăng nhập mới</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="failedLoginNotification" defaultChecked />
                <Label htmlFor="failedLoginNotification">Thông báo khi có nhiều lần đăng nhập thất bại</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="passwordChangeNotification" defaultChecked />
                <Label htmlFor="passwordChangeNotification">Thông báo khi mật khẩu được thay đổi</Label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="securityEmail">Email nhận thông báo bảo mật</Label>
                <div className="relative">
                  <Bell className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="securityEmail" placeholder="Nhập email" className="pl-8" defaultValue="admin@foodpos.vn" />
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

        <TabsContent value="backup" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Sao lưu dữ liệu</CardTitle>
              <CardDescription>Thiết lập cấu hình sao lưu dữ liệu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="autoBackup" defaultChecked />
                <Label htmlFor="autoBackup">Tự động sao lưu dữ liệu hàng ngày</Label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backupTime">Thời gian sao lưu</Label>
                <Select defaultValue="midnight">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian sao lưu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midnight">00:00 (Nửa đêm)</SelectItem>
                    <SelectItem value="morning">06:00 (Sáng)</SelectItem>
                    <SelectItem value="noon">12:00 (Trưa)</SelectItem>
                    <SelectItem value="evening">18:00 (Tối)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backupRetention">Thời gian lưu trữ bản sao lưu</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian lưu trữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 ngày</SelectItem>
                    <SelectItem value="14">14 ngày</SelectItem>
                    <SelectItem value="30">30 ngày</SelectItem>
                    <SelectItem value="90">90 ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backupLocation">Vị trí lưu trữ</Label>
                <div className="relative">
                  <HardDrive className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="backupLocation"
                    placeholder="Nhập đường dẫn"
                    className="pl-8"
                    defaultValue="/var/backups/foodpos"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Tạo bản sao lưu ngay
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

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Phục hồi dữ liệu</CardTitle>
              <CardDescription>Phục hồi dữ liệu từ bản sao lưu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backupFile">Chọn tệp sao lưu</Label>
                <div className="flex gap-2">
                  <Input id="backupFile" placeholder="Chọn tệp sao lưu" />
                  <Button variant="outline">Chọn tệp</Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="overwriteData" />
                <Label htmlFor="overwriteData">Ghi đè dữ liệu hiện tại</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="backupBeforeRestore" defaultChecked />
                <Label htmlFor="backupBeforeRestore">Sao lưu dữ liệu hiện tại trước khi phục hồi</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Upload className="mr-2 h-4 w-4" />
                Tải lên bản sao lưu
              </Button>
              <Button variant="default">
                <RefreshCw className="mr-2 h-4 w-4" />
                Phục hồi dữ liệu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
