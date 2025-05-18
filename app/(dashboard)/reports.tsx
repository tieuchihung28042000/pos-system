"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart } from "lucide-react"

export default function SalesReportPage() {
  const [period, setPeriod] = useState("this-month")
  const [chartType, setChartType] = useState("bar")

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Báo cáo doanh thu</h1>
          <p className="text-muted-foreground">Phân tích doanh thu theo thời gian và các chỉ số kinh doanh</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="this-week">Tuần này</SelectItem>
              <SelectItem value="last-week">Tuần trước</SelectItem>
              <SelectItem value="this-month">Tháng này</SelectItem>
              <SelectItem value="last-month">Tháng trước</SelectItem>
              <SelectItem value="this-year">Năm nay</SelectItem>
              <SelectItem value="custom">Tùy chỉnh...</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(125650000)}</div>
              <p className="text-xs text-muted-foreground">+15.2% so với tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Số đơn hàng</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground">+8.4% so với tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Giá trị trung bình</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(231825)}</div>
              <p className="text-xs text-muted-foreground">+6.3% so với tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lợi nhuận</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(52750000)}</div>
              <p className="text-xs text-muted-foreground">-2.5% so với tháng trước</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="products">Sản phẩm</TabsTrigger>
              <TabsTrigger value="categories">Danh mục</TabsTrigger>
              <TabsTrigger value="staff">Nhân viên</TabsTrigger>
              <TabsTrigger value="customers">Khách hàng</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <TabsContent value="overview">{/* Content for overview tab */}</TabsContent>
          <TabsContent value="products">{/* Content for products tab */}</TabsContent>
          <TabsContent value="categories">{/* Content for categories tab */}</TabsContent>
          <TabsContent value="staff">{/* Content for staff tab */}</TabsContent>
          <TabsContent value="customers">{/* Content for customers tab */}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
