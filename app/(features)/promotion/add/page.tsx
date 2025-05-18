"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, ChevronLeft, Clock, Info, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AddPromotionPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/promotions">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Quay lại</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Tạo khuyến mãi mới</h1>
          </div>
          <p className="text-muted-foreground">Tạo chương trình khuyến mãi hoặc mã giảm giá mới cho cửa hàng của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Hủy</Button>
          <Button>Lưu khuyến mãi</Button>
        </div>
      </div>

      <Tabs defaultValue="discount" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discount">Giảm giá sản phẩm</TabsTrigger>
          <TabsTrigger value="coupon">Mã giảm giá</TabsTrigger>
          <TabsTrigger value="bundle">Combo sản phẩm</TabsTrigger>
          <TabsTrigger value="gift">Quà tặng</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Nhập thông tin cơ bản về chương trình khuyến mãi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên khuyến mãi</Label>
                  <Input id="name" placeholder="Nhập tên khuyến mãi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả chi tiết về khuyến mãi" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày bắt đầu</Label>
                    <DatePickerWithPresets />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày kết thúc</Label>
                    <DatePickerWithPresets />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Kích hoạt ngay</Label>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="discount" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thiết lập giảm giá</CardTitle>
                  <CardDescription>Cấu hình loại giảm giá và các điều kiện áp dụng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Loại giảm giá</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại giảm giá" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Giảm theo phần trăm (%)</SelectItem>
                        <SelectItem value="fixed">Giảm số tiền cố định</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-value">Giá trị giảm</Label>
                    <div className="flex items-center">
                      <Input id="discount-value" type="number" placeholder="20" />
                      <span className="ml-2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-purchase">Giá trị đơn hàng tối thiểu</Label>
                    <div className="flex items-center">
                      <Input id="min-purchase" type="number" placeholder="100000" />
                      <span className="ml-2 text-muted-foreground">₫</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-discount">Giảm giá tối đa</Label>
                    <div className="flex items-center">
                      <Input id="max-discount" type="number" placeholder="50000" />
                      <span className="ml-2 text-muted-foreground">₫</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Để trống nếu không giới hạn giá trị giảm giá tối đa</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coupon" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thiết lập mã giảm giá</CardTitle>
                  <CardDescription>Cấu hình mã giảm giá và các điều kiện áp dụng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coupon-code">Mã giảm giá</Label>
                    <div className="flex gap-2">
                      <Input id="coupon-code" placeholder="SUMMER2023" className="uppercase" />
                      <Button variant="outline" type="button">
                        Tạo mã
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Loại giảm giá</Label>
                    <Select defaultValue="fixed">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại giảm giá" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Giảm theo phần trăm (%)</SelectItem>
                        <SelectItem value="fixed">Giảm số tiền cố định</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-value">Giá trị giảm</Label>
                    <div className="flex items-center">
                      <Input id="discount-value" type="number" placeholder="50000" />
                      <span className="ml-2 text-muted-foreground">₫</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usage-limit">Giới hạn sử dụng</Label>
                    <Input id="usage-limit" type="number" placeholder="100" />
                    <p className="text-xs text-muted-foreground">Để trống nếu không giới hạn số lần sử dụng</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-purchase">Giá trị đơn hàng tối thiểu</Label>
                    <div className="flex items-center">
                      <Input id="min-purchase" type="number" placeholder="200000" />
                      <span className="ml-2 text-muted-foreground">₫</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="one-time" />
                    <Label htmlFor="one-time">Chỉ sử dụng một lần cho mỗi khách hàng</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bundle" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thiết lập combo sản phẩm</CardTitle>
                  <CardDescription>Cấu hình combo sản phẩm và mức giảm giá</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bundle-type">Loại combo</Label>
                    <Select defaultValue="buy-x-get-y">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại combo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy-x-get-y">Mua X tặng Y</SelectItem>
                        <SelectItem value="bundle-discount">Mua nhiều giảm giá</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-quantity">Số lượng sản phẩm tối thiểu</Label>
                    <Input id="min-quantity" type="number" placeholder="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-value">Giá trị giảm</Label>
                    <div className="flex items-center">
                      <Input id="discount-value" type="number" placeholder="15" />
                      <span className="ml-2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Sản phẩm áp dụng</Label>
                      <Button variant="outline" size="sm" className="h-8">
                        <Plus className="mr-1 h-3 w-3" />
                        Thêm sản phẩm
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded bg-muted"></div>
                            <div>
                              <p className="text-sm font-medium">Áo thun nam</p>
                              <p className="text-xs text-muted-foreground">SKU: AT001</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded bg-muted"></div>
                            <div>
                              <p className="text-sm font-medium">Quần jean nam</p>
                              <p className="text-xs text-muted-foreground">SKU: QJ001</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gift" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thiết lập quà tặng</CardTitle>
                  <CardDescription>Cấu hình quà tặng và điều kiện nhận quà</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gift-type">Loại quà tặng</Label>
                    <Select defaultValue="product">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại quà tặng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Sản phẩm</SelectItem>
                        <SelectItem value="voucher">Phiếu quà tặng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-purchase">Giá trị đơn hàng tối thiểu</Label>
                    <div className="flex items-center">
                      <Input id="min-purchase" type="number" placeholder="500000" />
                      <span className="ml-2 text-muted-foreground">₫</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Quà tặng</Label>
                      <Button variant="outline" size="sm" className="h-8">
                        <Plus className="mr-1 h-3 w-3" />
                        Thêm quà tặng
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded bg-muted"></div>
                            <div>
                              <p className="text-sm font-medium">Túi vải canvas</p>
                              <p className="text-xs text-muted-foreground">SKU: TV001</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="number" placeholder="1" className="h-8 w-16" defaultValue="1" />
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Xóa</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-add" defaultChecked />
                    <Label htmlFor="auto-add">Tự động thêm quà tặng vào giỏ hàng</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Đối tượng áp dụng</CardTitle>
                <CardDescription>Chọn đối tượng khách hàng được áp dụng khuyến mãi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-type">Loại khách hàng</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả khách hàng</SelectItem>
                      <SelectItem value="new">Khách hàng mới</SelectItem>
                      <SelectItem value="returning">Khách hàng quay lại</SelectItem>
                      <SelectItem value="vip">Khách hàng VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Nhóm khách hàng</Label>
                    <Button variant="outline" size="sm" className="h-8">
                      <Plus className="mr-1 h-3 w-3" />
                      Thêm nhóm
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      Khách hàng thân thiết
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      Khách hàng sinh nhật tháng 6
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giới hạn sử dụng</CardTitle>
                <CardDescription>Thiết lập các giới hạn cho chương trình khuyến mãi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usage-limit">Tổng số lần sử dụng</Label>
                  <Input id="usage-limit" type="number" placeholder="1000" />
                  <p className="text-xs text-muted-foreground">Để trống nếu không giới hạn tổng số lần sử dụng</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage-per-customer">Số lần sử dụng cho mỗi khách hàng</Label>
                  <Input id="usage-per-customer" type="number" placeholder="1" />
                  <p className="text-xs text-muted-foreground">
                    Để trống nếu không giới hạn số lần sử dụng cho mỗi khách hàng
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kênh áp dụng</CardTitle>
                <CardDescription>Chọn các kênh bán hàng được áp dụng khuyến mãi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="pos" defaultChecked />
                  <Label htmlFor="pos">Cửa hàng (POS)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="online" defaultChecked />
                  <Label htmlFor="online">Website</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="app" />
                  <Label htmlFor="app">Ứng dụng di động</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Xem trước
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Giảm giá mùa hè</h3>
                    <Badge className="bg-green-500">Đang hoạt động</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>Giảm 20% cho tất cả sản phẩm mùa hè</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>01/06/2023 - 31/08/2023</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Còn lại 45 ngày</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

function DatePickerWithPresets() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
