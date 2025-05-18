"use client"

import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Download, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho phiếu xuất kho
const exportData = [
  {
    id: "PX001",
    date: "07/05/2024",
    staff: "Nguyễn Văn A",
    branch: "Chi nhánh Hà Nội",
    totalItems: 15,
    totalValue: 5800000,
    reason: "Xuất bán",
    status: "Hoàn thành",
  },
  {
    id: "PX002",
    date: "06/05/2024",
    staff: "Trần Thị B",
    branch: "Chi nhánh Hồ Chí Minh",
    totalItems: 8,
    totalValue: 3200000,
    reason: "Xuất bán",
    status: "Hoàn thành",
  },
  {
    id: "PX003",
    date: "05/05/2024",
    staff: "Lê Văn C",
    branch: "Chi nhánh Đà Nẵng",
    totalItems: 5,
    totalValue: 1500000,
    reason: "Chuyển kho",
    status: "Hoàn thành",
  },
  {
    id: "PX004",
    date: "04/05/2024",
    staff: "Phạm Thị D",
    branch: "Chi nhánh Hà Nội",
    totalItems: 12,
    totalValue: 4800000,
    reason: "Xuất bán",
    status: "Hoàn thành",
  },
  {
    id: "PX005",
    date: "03/05/2024",
    staff: "Hoàng Văn E",
    branch: "Chi nhánh Hồ Chí Minh",
    totalItems: 3,
    totalValue: 900000,
    reason: "Hàng lỗi",
    status: "Hoàn thành",
  },
  {
    id: "PX006",
    date: "02/05/2024",
    staff: "Ngô Thị F",
    branch: "Chi nhánh Đà Nẵng",
    totalItems: 7,
    totalValue: 2100000,
    reason: "Xuất bán",
    status: "Đang xử lý",
  },
  {
    id: "PX007",
    date: "01/05/2024",
    staff: "Đỗ Văn G",
    branch: "Chi nhánh Hà Nội",
    totalItems: 10,
    totalValue: 4000000,
    reason: "Chuyển kho",
    status: "Đang xử lý",
  },
]

export default function InventoryExportPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Xuất kho</h1>
          <p className="text-muted-foreground">Quản lý các phiếu xuất kho và theo dõi hàng hóa xuất ra</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Tạo phiếu xuất
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng phiếu xuất</CardTitle>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm xuất</CardTitle>
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60</div>
            <p className="text-xs text-muted-foreground">+15 so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Giá trị xuất kho</CardTitle>
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
            <div className="text-2xl font-bold">22.300.000đ</div>
            <p className="text-xs text-muted-foreground">+5.2M so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-yellow-600"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">-1 so với tuần trước</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiếu xuất kho</CardTitle>
          <CardDescription>Quản lý tất cả các phiếu xuất kho của cửa hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
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
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Lý do xuất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="sale">Xuất bán</SelectItem>
                  <SelectItem value="transfer">Chuyển kho</SelectItem>
                  <SelectItem value="defect">Hàng lỗi</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="hanoi">Chi nhánh Hà Nội</SelectItem>
                  <SelectItem value="hcm">Chi nhánh Hồ Chí Minh</SelectItem>
                  <SelectItem value="danang">Chi nhánh Đà Nẵng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Ngày xuất</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Chi nhánh</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.staff}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>{item.totalItems}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(item.totalValue)}
                  </TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Hoàn thành"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
