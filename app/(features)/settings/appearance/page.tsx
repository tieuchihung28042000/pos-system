"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Save, Palette, Layout, Monitor, Moon, Sun, Laptop, RefreshCw } from "lucide-react"

export default function AppearanceSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState("light")

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
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt giao diện</h1>
        <p className="text-muted-foreground">Tùy chỉnh giao diện và hiển thị của hệ thống</p>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">Chủ đề</TabsTrigger>
          <TabsTrigger value="layout">Bố cục</TabsTrigger>
          <TabsTrigger value="display">Hiển thị</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Chủ đề</CardTitle>
              <CardDescription>Tùy chỉnh chủ đề và màu sắc của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Chế độ hiển thị</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-primary ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-6 w-6" />
                    <span className="text-sm font-medium">Sáng</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-primary ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-6 w-6" />
                    <span className="text-sm font-medium">Tối</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-primary ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-6 w-6" />
                    <span className="text-sm font-medium">Hệ thống</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Màu chủ đạo</Label>
                <RadioGroup defaultValue="blue" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
                    <Label
                      htmlFor="blue"
                      className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-6 w-6 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Xanh Facebook</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="purple" id="purple" className="peer sr-only" />
                    <Label
                      htmlFor="purple"
                      className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-6 w-6 rounded-full bg-purple-500" />
                      <span className="text-sm font-medium">Tím</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="green" id="green" className="peer sr-only" />
                    <Label
                      htmlFor="green"
                      className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-6 w-6 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Xanh lá</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Hiệu ứng</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="animations" defaultChecked />
                    <Label htmlFor="animations">Bật hiệu ứng chuyển động</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="transitions" defaultChecked />
                    <Label htmlFor="transitions">Bật hiệu ứng chuyển tiếp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="reducedMotion" />
                    <Label htmlFor="reducedMotion">Giảm hiệu ứng chuyển động</Label>
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
                    <Palette className="mr-2 h-4 w-4" />
                    Lưu cài đặt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Tùy chỉnh nâng cao</CardTitle>
              <CardDescription>Tùy chỉnh các thành phần giao diện</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Bo góc (Border Radius)</Label>
                  <div className="flex items-center gap-4">
                    <Slider defaultValue={[8]} max={16} step={1} className="flex-1" />
                    <span className="w-12 text-center">8px</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Cỡ chữ</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn cỡ chữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Nhỏ</SelectItem>
                      <SelectItem value="medium">Vừa</SelectItem>
                      <SelectItem value="large">Lớn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Phông chữ</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phông chữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="customScrollbar" defaultChecked />
                <Label htmlFor="customScrollbar">Sử dụng thanh cuộn tùy chỉnh</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                Khôi phục mặc định
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu cài đặt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Bố cục</CardTitle>
              <CardDescription>Tùy chỉnh bố cục và vị trí các thành phần</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Vị trí thanh bên</Label>
                <RadioGroup defaultValue="left" className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="left" id="sidebar-left" className="peer sr-only" />
                    <Label
                      htmlFor="sidebar-left"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        <span className="text-sm font-medium">Bên trái</span>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="right" id="sidebar-right" className="peer sr-only" />
                    <Label
                      htmlFor="sidebar-right"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        <span className="text-sm font-medium">Bên phải</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Kiểu thanh bên</Label>
                <RadioGroup defaultValue="expanded" className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="expanded" id="sidebar-expanded" className="peer sr-only" />
                    <Label
                      htmlFor="sidebar-expanded"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        <span className="text-sm font-medium">Mở rộng</span>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="collapsed" id="sidebar-collapsed" className="peer sr-only" />
                    <Label
                      htmlFor="sidebar-collapsed"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        <span className="text-sm font-medium">Thu gọn</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="stickyHeader" defaultChecked />
                <Label htmlFor="stickyHeader">Cố định thanh tiêu đề</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="compactMode" />
                <Label htmlFor="compactMode">Chế độ gọn nhẹ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="fullWidth" defaultChecked />
                <Label htmlFor="fullWidth">Sử dụng chiều rộng tối đa</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Layout className="mr-2 h-4 w-4" />
                    Lưu bố cục
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Tùy chỉnh trang chủ</CardTitle>
              <CardDescription>Tùy chỉnh các thành phần hiển thị trên trang chủ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Các widget hiển thị</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="showSalesWidget" defaultChecked />
                    <Label htmlFor="showSalesWidget">Biểu đồ doanh số</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="showInventoryWidget" defaultChecked />
                    <Label htmlFor="showInventoryWidget">Thông tin tồn kho</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="showCustomerWidget" defaultChecked />
                    <Label htmlFor="showCustomerWidget">Thông tin khách hàng</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="showRecentOrdersWidget" defaultChecked />
                    <Label htmlFor="showRecentOrdersWidget">Đơn hàng gần đây</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="showCalendarWidget" />
                    <Label htmlFor="showCalendarWidget">Lịch</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultDashboardView">Chế độ xem mặc định</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chế độ xem mặc định" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
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
                    Lưu cài đặt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Hiển thị</CardTitle>
              <CardDescription>Tùy chỉnh cách hiển thị nội dung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tableRowsPerPage">Số dòng mỗi trang trong bảng</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn số dòng mỗi trang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 dòng</SelectItem>
                      <SelectItem value="10">10 dòng</SelectItem>
                      <SelectItem value="20">20 dòng</SelectItem>
                      <SelectItem value="50">50 dòng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="currencyFormat">Định dạng tiền tệ</Label>
                <Select defaultValue="vnd">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn định dạng tiền tệ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnd">123.456 ₫</SelectItem>
                    <SelectItem value="vnd_space">123.456 VND</SelectItem>
                    <SelectItem value="vnd_prefix">₫ 123.456</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showDecimalPlaces" />
                <Label htmlFor="showDecimalPlaces">Hiển thị số thập phân trong giá tiền</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showThousandsSeparator" defaultChecked />
                <Label htmlFor="showThousandsSeparator">Hiển thị dấu phân cách hàng nghìn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enableRTL" />
                <Label htmlFor="enableRTL">Bật chế độ RTL (Phải sang trái)</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Monitor className="mr-2 h-4 w-4" />
                    Lưu cài đặt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="fade-in-delay-2">
            <CardHeader>
              <CardTitle>Khả năng tiếp cận</CardTitle>
              <CardDescription>Tùy chỉnh cài đặt khả năng tiếp cận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contrastLevel">Độ tương phản</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[100]} max={200} step={10} className="flex-1" />
                  <span className="w-12 text-center">100%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="highContrast" />
                <Label htmlFor="highContrast">Chế độ tương phản cao</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="largeText" />
                <Label htmlFor="largeText">Văn bản lớn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="screenReader" />
                <Label htmlFor="screenReader">Tối ưu hóa cho trình đọc màn hình</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="reducedMotion" />
                <Label htmlFor="reducedMotion">Giảm chuyển động</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu cài đặt
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
