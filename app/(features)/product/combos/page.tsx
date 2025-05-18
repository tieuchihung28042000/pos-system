"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho combo sản phẩm
const comboData = [
  {
    id: "CB001",
    name: "Combo Áo Thun + Quần Jean",
    products: ["Áo thun nam basic", "Quần jean nam slim fit"],
    originalPrice: 650000,
    comboPrice: 550000,
    discount: 15.4,
    status: "Đang bán",
    stock: 25,
    sold: 42,
  },
  {
    id: "CB002",
    name: "Combo Áo Sơ Mi + Quần Tây",
    products: ["Áo sơ mi nam dài tay", "Quần tây nam công sở"],
    originalPrice: 850000,
    comboPrice: 700000,
    discount: 17.6,
    status: "Đang bán",
    stock: 18,
    sold: 35,
  },
  {
    id: "CB003",
    name: "Combo Áo Khoác + Áo Thun",
    products: ["Áo khoác bomber nam", "Áo thun nam basic"],
    originalPrice: 950000,
    comboPrice: 800000,
    discount: 15.8,
    status: "Đang bán",
    stock: 15,
    sold: 28,
  },
  {
    id: "CB004",
    name: "Combo Áo Polo + Quần Short",
    products: ["Áo polo nam cổ bẻ", "Quần short nam thể thao"],
    originalPrice: 550000,
    comboPrice: 450000,
    discount: 18.2,
    status: "Đang bán",
    stock: 30,
    sold: 50,
  },
  {
    id: "CB005",
    name: "Combo Áo Hoodie + Quần Jogger",
    products: ["Áo hoodie nam oversize", "Quần jogger nam thể thao"],
    originalPrice: 750000,
    comboPrice: 600000,
    discount: 20,
    status: "Hết hàng",
    stock: 0,
    sold: 65,
  },
  {
    id: "CB006",
    name: "Combo Áo Vest + Quần Tây + Sơ Mi",
    products: ["Áo vest nam công sở", "Quần tây nam công sở", "Áo sơ mi nam dài tay"],
    originalPrice: 1850000,
    comboPrice: 1500000,
    discount: 18.9,
    status: "Đang bán",
    stock: 10,
    sold: 22,
  },
  {
    id: "CB007",
    name: "Combo Áo Thun + Quần Short + Nón",
    products: ["Áo thun nam basic", "Quần short nam thể thao", "Nón lưỡi trai"],
    originalPrice: 650000,
    comboPrice: 500000,
    discount: 23.1,
    status: "Ngừng bán",
    stock: 5,
    sold: 18,
  },
]

export default function ProductCombosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Combo sản phẩm</h1>
          <p className="text-muted-foreground">Quản lý các combo sản phẩm và thiết lập giá ưu đãi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm combo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng combo</CardTitle>
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
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đã bán</CardTitle>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">260</div>
            <p className="text-xs text-muted-foreground">+45 so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156.000.000đ</div>
            <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách combo sản phẩm</CardTitle>
          <CardDescription>Quản lý tất cả các combo sản phẩm của cửa hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang bán</SelectItem>
                  <SelectItem value="outofstock">Hết hàng</SelectItem>
                  <SelectItem value="inactive">Ngừng bán</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="bestseller">Bán chạy nhất</SelectItem>
                  <SelectItem value="discount">Giảm giá nhiều nhất</SelectItem>
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
                  <DropdownMenuItem>Giảm giá trên 15%</DropdownMenuItem>
                  <DropdownMenuItem>Giảm giá trên 20%</DropdownMenuItem>
                  <DropdownMenuItem>Còn hàng</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm combo..."
                  className="w-[200px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã combo</TableHead>
                <TableHead>Tên combo</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Giá gốc</TableHead>
                <TableHead>Giá combo</TableHead>
                <TableHead>Giảm giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Đã bán</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comboData.map((combo) => (
                <TableRow key={combo.id}>
                  <TableCell className="font-medium">{combo.id}</TableCell>
                  <TableCell>{combo.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {combo.products.map((product, index) => (
                        <span key={index} className="text-sm">
                          {product}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(combo.originalPrice)}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(combo.comboPrice)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {combo.discount}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        combo.status === "Đang bán"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : combo.status === "Hết hàng"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {combo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{combo.stock}</TableCell>
                  <TableCell>{combo.sold}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
