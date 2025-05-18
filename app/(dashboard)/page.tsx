"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Users,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground">Xem tổng quan về hoạt động kinh doanh của bạn</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-full">
            <Link href="/pos">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Bán hàng
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white p-1 rounded-full">
            <TabsTrigger value="overview" className="rounded-full">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="sales" className="rounded-full">
              Doanh số
            </TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-full">
              Kho hàng
            </TabsTrigger>
            <TabsTrigger value="customers" className="rounded-full">
              Khách hàng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="dashboard-stat">4.250.000 ₫</div>
                  <p className="dashboard-label">+20.1% so với hôm qua</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đơn hàng hôm nay</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="dashboard-stat">24</div>
                  <p className="dashboard-label">+12% so với hôm qua</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
                  <Users className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="dashboard-stat">8</div>
                  <p className="dashboard-label">+4 so với hôm qua</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lợi nhuận</CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="dashboard-stat">1.850.000 ₫</div>
                  <p className="dashboard-label">+18% so với hôm qua</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="dashboard-card col-span-4">
                <CardHeader>
                  <CardTitle>Doanh thu theo thời gian</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Biểu đồ doanh thu theo thời gian</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="dashboard-card col-span-3">
                <CardHeader>
                  <CardTitle>Sản phẩm bán chạy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Cà phê sữa đá", sales: 42, revenue: "1.260.000 ₫" },
                      { name: "Trà sữa trân châu", sales: 38, revenue: "1.140.000 ₫" },
                      { name: "Bánh mì thịt", sales: 25, revenue: "625.000 ₫" },
                      { name: "Nước ép cam", sales: 22, revenue: "550.000 ₫" },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-[30px] text-center">{i + 1}</div>
                        <div className="ml-2 flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">Đã bán: {product.sales}</div>
                        </div>
                        <div className="font-medium">{product.revenue}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Cảnh báo tồn kho</CardTitle>
                  <CardDescription>Sản phẩm sắp hết hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Cà phê hạt Arabica", stock: 5, min: 10 },
                      { name: "Trà ô long", stock: 3, min: 8 },
                      { name: "Sữa tươi", stock: 4, min: 12 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Tồn kho: {item.stock} (Tối thiểu: {item.min})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                  <CardDescription>Các đơn hàng mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "ĐH-2023", time: "10:25", status: "Hoàn thành", amount: "185.000 ₫" },
                      { id: "ĐH-2022", time: "09:40", status: "Hoàn thành", amount: "320.000 ₫" },
                      { id: "ĐH-2021", time: "09:15", status: "Đang xử lý", amount: "150.000 ₫" },
                    ].map((order, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2">
                          {order.status === "Hoàn thành" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.time} - {order.status}
                          </div>
                        </div>
                        <div className="font-medium">{order.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Công nợ khách hàng</CardTitle>
                  <CardDescription>Khách hàng có công nợ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Nguyễn Văn A", debt: "1.500.000 ₫", due: "15/05/2023" },
                      { name: "Trần Thị B", debt: "850.000 ₫", due: "20/05/2023" },
                      { name: "Lê Văn C", debt: "2.300.000 ₫", due: "25/05/2023" },
                    ].map((customer, i) => (
                      <div key={i} className="flex items-center">
                        <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                        <div className="flex-1">
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">Hạn: {customer.due}</div>
                        </div>
                        <div className="font-medium text-red-500">{customer.debt}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="sales"
            className="h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm"
          >
            <p className="text-muted-foreground">Biểu đồ phân tích doanh số chi tiết</p>
          </TabsContent>

          <TabsContent
            value="inventory"
            className="h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm"
          >
            <p className="text-muted-foreground">Báo cáo tồn kho chi tiết</p>
          </TabsContent>

          <TabsContent
            value="customers"
            className="h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm"
          >
            <p className="text-muted-foreground">Phân tích khách hàng chi tiết</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
