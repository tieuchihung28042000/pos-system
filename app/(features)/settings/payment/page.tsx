"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, CreditCard, Wallet, QrCode, DollarSign, Percent, RefreshCw, CheckCircle2 } from "lucide-react"

export default function PaymentSettingsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt thanh toán</h1>
        <p className="text-muted-foreground">Quản lý phương thức thanh toán và cấu hình liên quan</p>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">Phương thức thanh toán</TabsTrigger>
          <TabsTrigger value="tax">Thuế & Phí</TabsTrigger>
          <TabsTrigger value="discount">Giảm giá</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Quản lý các phương thức thanh toán được chấp nhận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
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
                    <Wallet className="h-5 w-5 text-primary" />
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
                    <QrCode className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Quét mã QR</p>
                      <p className="text-sm text-muted-foreground">Thanh toán bằng cách quét mã QR</p>
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
                  <Label htmlFor="currencyFormat">Định dạng tiền tệ</Label>
                  <Select defaultValue="vnd_suffix">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng tiền tệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vnd_suffix">123.456 ₫</SelectItem>
                      <SelectItem value="vnd_space">123.456 VND</SelectItem>
                      <SelectItem value="vnd_prefix">₫ 123.456</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allowPartialPayment" defaultChecked />
                <Label htmlFor="allowPartialPayment">Cho phép thanh toán một phần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allowMultiplePaymentMethods" defaultChecked />
                <Label htmlFor="allowMultiplePaymentMethods">Cho phép sử dụng nhiều phương thức thanh toán</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="requirePaymentConfirmation" />
                <Label htmlFor="requirePaymentConfirmation">Yêu cầu xác nhận thanh toán</Label>
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

        <TabsContent value="tax" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Cấu hình thuế</CardTitle>
              <CardDescription>Thiết lập cấu hình thuế cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="taxRate">Thuế suất mặc định (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="taxRate" placeholder="Nhập thuế suất" className="pl-8" defaultValue="10" />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="taxCalculation">Phương pháp tính thuế</Label>
                  <Select defaultValue="inclusive">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương pháp tính thuế" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inclusive">Đã bao gồm trong giá (VAT)</SelectItem>
                      <SelectItem value="exclusive">Tính thêm vào giá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="taxId">Mã số thuế</Label>
                <Input id="taxId" placeholder="Nhập mã số thuế" defaultValue="0123456789" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showTaxOnReceipt" defaultChecked />
                <Label htmlFor="showTaxOnReceipt">Hiển thị thuế trên hóa đơn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enableTaxExemption" defaultChecked />
                <Label htmlFor="enableTaxExemption">Cho phép miễn thuế cho một số sản phẩm</Label>
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
              <CardTitle>Phí dịch vụ</CardTitle>
              <CardDescription>Thiết lập cấu hình phí dịch vụ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enableServiceCharge" />
                <Label htmlFor="enableServiceCharge">Bật phí dịch vụ</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="serviceChargeRate">Tỷ lệ phí dịch vụ (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="serviceChargeRate"
                      placeholder="Nhập tỷ lệ phí dịch vụ"
                      className="pl-8"
                      defaultValue="5"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="serviceChargeCalculation">Phương pháp tính phí</Label>
                  <Select defaultValue="subtotal">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương pháp tính phí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subtotal">Tính trên tổng tiền hàng</SelectItem>
                      <SelectItem value="total">Tính trên tổng tiền (bao gồm thuế)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="serviceChargeName">Tên phí dịch vụ</Label>
                <Input id="serviceChargeName" placeholder="Nhập tên phí dịch vụ" defaultValue="Phí phục vụ" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showServiceChargeOnReceipt" defaultChecked />
                <Label htmlFor="showServiceChargeOnReceipt">Hiển thị phí dịch vụ trên hóa đơn</Label>
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

        <TabsContent value="discount" className="mt-6 space-y-4 fade-in">
          <Card className="fade-in-delay-1">
            <CardHeader>
              <CardTitle>Cấu hình giảm giá</CardTitle>
              <CardDescription>Thiết lập cấu hình giảm giá cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="maxDiscountPercent">Tỷ lệ giảm giá tối đa (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxDiscountPercent"
                      placeholder="Nhập tỷ lệ giảm giá tối đa"
                      className="pl-8"
                      defaultValue="50"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="maxDiscountAmount">Số tiền giảm giá tối đa</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxDiscountAmount"
                      placeholder="Nhập số tiền giảm giá tối đa"
                      className="pl-8"
                      defaultValue="1000000"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allowManualDiscount" defaultChecked />
                <Label htmlFor="allowManualDiscount">Cho phép giảm giá thủ công</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="requireDiscountReason" />
                <Label htmlFor="requireDiscountReason">Yêu cầu lý do khi giảm giá thủ công</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allowCombineDiscounts" defaultChecked />
                <Label htmlFor="allowCombineDiscounts">Cho phép kết hợp nhiều loại giảm giá</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="applyDiscountBeforeTax" defaultChecked />
                <Label htmlFor="applyDiscountBeforeTax">Áp dụng giảm giá trước khi tính thuế</Label>
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
              <CardTitle>Mã giảm giá</CardTitle>
              <CardDescription>Thiết lập cấu hình mã giảm giá</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enableCoupons" defaultChecked />
                <Label htmlFor="enableCoupons">Bật tính năng mã giảm giá</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="couponFormat">Định dạng mã giảm giá</Label>
                  <Select defaultValue="alphanumeric">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng mã giảm giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alphanumeric">Chữ và số (ABC123)</SelectItem>
                      <SelectItem value="numeric">Chỉ số (123456)</SelectItem>
                      <SelectItem value="alphabetic">Chỉ chữ (ABCDEF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="couponLength">Độ dài mã giảm giá</Label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ dài mã giảm giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 ký tự</SelectItem>
                      <SelectItem value="8">8 ký tự</SelectItem>
                      <SelectItem value="10">10 ký tự</SelectItem>
                      <SelectItem value="12">12 ký tự</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="caseSensitiveCoupons" />
                <Label htmlFor="caseSensitiveCoupons">Phân biệt chữ hoa chữ thường</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="trackCouponUsage" defaultChecked />
                <Label htmlFor="trackCouponUsage">Theo dõi lịch sử sử dụng mã giảm giá</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allowCouponGeneration" defaultChecked />
                <Label htmlFor="allowCouponGeneration">Cho phép tạo mã giảm giá tự động</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tạo mã mẫu
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
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
