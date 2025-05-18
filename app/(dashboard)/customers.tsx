"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  group: string
  points: number
  totalSpent: number
  lastPurchase: string
  createdAt: string
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [groupFilter, setGroupFilter] = useState("all")

  // Danh sách khách hàng mẫu
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      group: "VIP",
      points: 120,
      totalSpent: 5200000,
      lastPurchase: "15/05/2023",
      createdAt: "01/01/2023",
    },
    {
      id: "2",
      name: "Trần Thị B",
      phone: "0912345678",
      email: "tranthib@example.com",
      group: "Thân thiết",
      points: 85,
      totalSpent: 3500000,
      lastPurchase: "10/05/2023",
      createdAt: "15/01/2023",
    },
    {
      id: "3",
      name: "Lê Văn C",
      phone: "0923456789",
      email: "levanc@example.com",
      group: "Mới",
      points: 10,
      totalSpent: 450000,
      lastPurchase: "05/05/2023",
      createdAt: "01/05/2023",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      phone: "0934567890",
      email: "phamthid@example.com",
      group: "Thân thiết",
      points: 65,
      totalSpent: 2800000,
      lastPurchase: "12/05/2023",
      createdAt: "10/02/2023",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      phone: "0945678901",
      email: "hoangvane@example.com",
      group: "VIP",
      points: 150,
      totalSpent: 6500000,
      lastPurchase: "14/05/2023",
      createdAt: "05/01/2023",
    },
    {
      id: "6",
      name: "Ngô Thị F",
      phone: "0956789012",
      email: "ngothif@example.com",
      group: "Mới",
      points: 15,
      totalSpent: 650000,
      lastPurchase: "08/05/2023",
      createdAt: "20/04/2023",
    },
    {
      id: "7",
      name: "Đỗ Văn G",
      phone: "0967890123",
      email: "dovang@example.com",
      group: "Thân thiết",
      points: 70,
      totalSpent: 3100000,
      lastPurchase: "11/05/2023",
      createdAt: "15/02/2023",
    },
    {
      id: "8",
      name: "Lý Thị H",
      phone: "0978901234",
      email: "lythih@example.com",
      group: "Mới",
      points: 5,
      totalSpent: 250000,
      lastPurchase: "03/05/2023",
      createdAt: "28/04/2023",
    },
  ])

  // Lọc khách hàng
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = groupFilter === "all" || customer.group === groupFilter

    return matchesSearch && matchesGroup
  })

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Tính số lượng khách hàng theo nhóm
  const vipCustomers = customers.filter((customer) => customer.group === "VIP").length
  const regularCustomers = customers.filter((customer) => customer.group === "Thân thiết").length
  const newCustomers = customers.filter((customer) => customer.group === "Mới").length

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
          <p className="text-muted-foreground">Quản lý thông tin và lịch sử mua hàng của khách hàng</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/customer/add">
              <Plus className="mr-2 h-4 w-4" />
              Thêm khách hàng
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Xuất / Nhập
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Xuất Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                <span>Nhập từ Excel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng VIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{vipCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng thân thiết</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{regularCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{newCustomers}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, số điện thoại, email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Nhóm</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Thân thiết">Thân thiết</SelectItem>
                  <SelectItem value="Mới">Mới</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nhóm</TableHead>
                <TableHead className="text-right">Điểm tích lũy</TableHead>
                <TableHead className="text-right">Tổng chi tiêu</TableHead>
                <TableHead>Mua hàng gần nhất</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Không tìm thấy khách hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.group === "VIP" ? (
                        <Badge className="bg-purple-500">{customer.group}</Badge>
                      ) : customer.group === "Thân thiết" ? (
                        <Badge className="bg-blue-500">{customer.group}</Badge>
                      ) : (
                        <Badge className="bg-green-500">{customer.group}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{customer.points}</TableCell>
                    <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell>{customer.lastPurchase}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            <span>Lịch sử mua hàng</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
