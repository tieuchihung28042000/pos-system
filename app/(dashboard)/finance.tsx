"use client"

import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Download, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dữ liệu mẫu cho biểu đồ
const chartData = [
  { date: "01/05", thu: 1200000, chi: 800000 },
  { date: "02/05", thu: 1800000, chi: 1000000 },
  { date: "03/05", thu: 1500000, chi: 900000 },
  { date: "04/05", thu: 2200000, chi: 1100000 },
  { date: "05/05", thu: 1900000, chi: 950000 },
  { date: "06/05", thu: 2500000, chi: 1300000 },
  { date: "07/05", thu: 2800000, chi: 1500000 },
]

// Dữ liệu mẫu cho giao dịch thu
const incomeData = [
  {
    id: "IN001",
    date: "07/05/2024",
    amount: 2800000,
    category: "Bán hàng",
    description: "Doanh thu bán hàng",
    paymentMethod: "Tiền mặt",
    status: "Hoàn thành",
  },
  {
    id: "IN002",
    date: "06/05/2024",
    amount: 1500000,
    category: "Bán hàng",
    description: "Doanh thu bán hàng online",
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
  },
  {
    id: "IN003",
    date: "06/05/2024",
    amount: 1000000,
    category: "Khác",
    description: "Hoàn tiền từ nhà cung cấp",
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
  },
  {
    id: "IN004",
    date: "05/05/2024",
    amount: 1900000,
    category: "Bán hàng",
    description: "Doanh thu bán hàng",
    paymentMethod: "Tiền mặt",
    status: "Hoàn thành",
  },
  {
    id: "IN005",
    date: "04/05/2024",
    amount: 2200000,
    category: "Bán hàng",
    description: "Doanh thu bán hàng",
    paymentMethod: "Tiền mặt",
    status: "Hoàn thành",
  },
]

// Dữ liệu mẫu cho giao dịch chi
const expenseData = [
  {
    id: "EX001",
    date: "07/05/2024",
    amount: 1500000,
    category: "Nhập hàng",
    description: "Thanh toán nhà cung cấp A",
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
  },
  {
    id: "EX002",
    date: "06/05/2024",
    amount: 800000,
    category: "Tiện ích",
    description: "Tiền điện tháng 5",
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
  },
  {
    id: "EX003",
    date: "06/05/2024",
    amount: 500000,
    category: "Tiện ích",
    description: "Tiền nước tháng 5",
    paymentMethod: "Tiền mặt",
    status: "Hoàn thành",
  },
  {
    id: "EX004",
    date: "05/05/2024",
    amount: 950000,
    category: "Nhân viên",
    description: "Tạm ứng lương nhân viên",
    paymentMethod: "Tiền mặt",
    status: "Hoàn thành",
  },
  {
    id: "EX005",
    date: "04/05/2024",
    amount: 1100000,
    category: "Nhập hàng",
    description: "Thanh toán nhà cung cấp B",
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
  },
]

export default function FinancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý thu chi</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các khoản thu chi của cửa hàng</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm giao dịch
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng thu</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-green-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13.900.000đ</div>
            <p className="text-xs text-muted-foreground">+20.1% so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng chi</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-red-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.550.000đ</div>
            <p className="text-xs text-muted-foreground">+12.5% so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Số dư</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.350.000đ</div>
            <p className="text-xs text-muted-foreground">+30.2% so với tuần trước</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Biểu đồ thu chi</CardTitle>
          <CardDescription>Biểu đồ thu chi trong 7 ngày gần nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              thu: {
                label: "Thu",
                color: "hsl(var(--chart-1))",
              },
              chi: {
                label: "Chi",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="aspect-[4/3] sm:aspect-[3/1]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("vi-VN", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="thu" stroke="var(--color-thu)" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="chi" stroke="var(--color-chi)" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="income" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="income">Thu</TabsTrigger>
            <TabsTrigger value="expense">Chi</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Lọc
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tất cả</DropdownMenuItem>
                <DropdownMenuItem>Hôm nay</DropdownMenuItem>
                <DropdownMenuItem>Tuần này</DropdownMenuItem>
                <DropdownMenuItem>Tháng này</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm..." className="w-[200px] pl-8" />
            </div>
          </div>
        </div>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách thu</CardTitle>
              <CardDescription>Danh sách các khoản thu của cửa hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          maximumFractionDigits: 0,
                        }).format(item.amount)}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expense">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách chi</CardTitle>
              <CardDescription>Danh sách các khoản chi của cửa hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          maximumFractionDigits: 0,
                        }).format(item.amount)}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
