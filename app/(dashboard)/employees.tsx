"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Filter,
  Phone,
  Mail,
  UserCog,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Employee {
  id: string
  name: string
  position: string
  email: string
  phone: string
  status: "active" | "inactive"
  department: string
  joinDate: string
  avatar?: string
  lastActive: string
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Danh sách nhân viên mẫu
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Nguyễn Văn An",
      position: "Quản lý",
      email: "nguyenvanan@example.com",
      phone: "0901234567",
      status: "active",
      department: "Quản lý",
      joinDate: "01/01/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "Hôm nay, 09:45",
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      position: "Thu ngân",
      email: "tranthib@example.com",
      phone: "0912345678",
      status: "active",
      department: "Bán hàng",
      joinDate: "15/03/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "Hôm nay, 10:30",
    },
    {
      id: "3",
      name: "Lê Văn Cường",
      position: "Barista",
      email: "levanc@example.com",
      phone: "0923456789",
      status: "active",
      department: "Chế biến",
      joinDate: "05/04/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "Hôm qua, 15:20",
    },
    {
      id: "4",
      name: "Phạm Thị Dung",
      position: "Phục vụ",
      email: "phamthid@example.com",
      phone: "0934567890",
      status: "inactive",
      department: "Phục vụ",
      joinDate: "10/05/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "3 ngày trước",
    },
    {
      id: "5",
      name: "Hoàng Văn Em",
      position: "Bếp trưởng",
      email: "hoangvane@example.com",
      phone: "0945678901",
      status: "active",
      department: "Chế biến",
      joinDate: "01/06/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "Hôm nay, 08:15",
    },
    {
      id: "6",
      name: "Ngô Thị Phương",
      position: "Kế toán",
      email: "ngothif@example.com",
      phone: "0956789012",
      status: "active",
      department: "Kế toán",
      joinDate: "15/07/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "Hôm nay, 11:05",
    },
    {
      id: "7",
      name: "Đỗ Văn Giang",
      position: "Nhân viên kho",
      email: "dovang@example.com",
      phone: "0967890123",
      status: "active",
      department: "Kho hàng",
      joinDate: "01/08/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "2 ngày trước",
    },
    {
      id: "8",
      name: "Lý Thị Hoa",
      position: "Thu ngân",
      email: "lythih@example.com",
      phone: "0978901234",
      status: "inactive",
      department: "Bán hàng",
      joinDate: "15/09/2022",
      avatar: "/placeholder.svg?height=32&width=32",
      lastActive: "1 tuần trước",
    },
  ])

  // Lọc nhân viên
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)

    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Đếm số lượng nhân viên theo trạng thái
  const activeEmployees = employees.filter((employee) => employee.status === "active").length
  const inactiveEmployees = employees.filter((employee) => employee.status === "inactive").length

  // Đếm số lượng nhân viên theo phòng ban
  const departmentCounts: Record<string, number> = {}
  employees.forEach((employee) => {
    departmentCounts[employee.department] = (departmentCounts[employee.department] || 0) + 1
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Quản lý nhân viên</h1>
          <p className="text-muted-foreground">Quản lý thông tin và phân quyền cho nhân viên</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/employee/add">
              <Plus className="mr-2 h-4 w-4" />
              Thêm nhân viên
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhân viên hiện tại</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã nghỉ việc</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{inactiveEmployees}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ca làm việc hôm nay</CardTitle>
              <CalendarClock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Phòng ban</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phòng ban</SelectItem>
                  <SelectItem value="Quản lý">Quản lý</SelectItem>
                  <SelectItem value="Bán hàng">Bán hàng</SelectItem>
                  <SelectItem value="Chế biến">Chế biến</SelectItem>
                  <SelectItem value="Phục vụ">Phục vụ</SelectItem>
                  <SelectItem value="Kho hàng">Kho hàng</SelectItem>
                  <SelectItem value="Kế toán">Kế toán</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Trạng thái</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang làm việc</SelectItem>
                  <SelectItem value="inactive">Đã nghỉ việc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Thông tin liên hệ</TableHead>
                <TableHead>Ngày vào làm</TableHead>
                <TableHead>Truy cập gần nhất</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    Không tìm thấy nhân viên nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Gọi điện">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Gửi email">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{employee.joinDate}</TableCell>
                    <TableCell>{employee.lastActive}</TableCell>
                    <TableCell>
                      {employee.status === "active" ? (
                        <Badge className="bg-green-500">Đang làm việc</Badge>
                      ) : (
                        <Badge variant="destructive">Đã nghỉ việc</Badge>
                      )}
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
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Phân quyền</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Lịch làm việc</span>
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
