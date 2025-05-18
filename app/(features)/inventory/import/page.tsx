"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Dữ liệu mẫu cho phiếu nhập kho
const importData = [
  {
    id: "NK001",
    date: "2023-05-15",
    supplier: "Công ty TNHH Thời trang ABC",
    totalItems: 120,
    totalValue: 15000000,
    status: "completed",
    note: "Nhập hàng mới cho mùa hè",
    createdBy: "Nguyễn Văn A",
  },
  {
    id: "NK002",
    date: "2023-05-20",
    supplier: "Công ty CP May mặc XYZ",
    totalItems: 85,
    totalValue: 9500000,
    status: "completed",
    note: "Bổ sung hàng tồn",
    createdBy: "Trần Thị B",
  },
  {
    id: "NK003",
    date: "2023-05-25",
    supplier: "Công ty TNHH Thời trang ABC",
    totalItems: 150,
    totalValue: 18500000,
    status: "pending",
    note: "Nhập hàng mới cho mùa thu",
    createdBy: "Nguyễn Văn A",
  },
  {
    id: "NK004",
    date: "2023-05-28",
    supplier: "Công ty TNHH Phụ kiện DEF",
    totalItems: 50,
    totalValue: 5000000,
    status: "draft",
    note: "Nhập phụ kiện mới",
    createdBy: "Lê Văn C",
  },
  {
    id: "NK005",
    date: "2023-06-01",
    supplier: "Công ty CP May mặc XYZ",
    totalItems: 100,
    totalValue: 12000000,
    status: "completed",
    note: "Nhập hàng theo đơn đặt hàng DH001",
    createdBy: "Trần Thị B",
  },
  {
    id: "NK006",
    date: "2023-06-05",
    supplier: "Công ty TNHH Phụ kiện DEF",
    totalItems: 30,
    totalValue: 3500000,
    status: "pending",
    note: "Bổ sung phụ kiện",
    createdBy: "Lê Văn C",
  },
]

// Dữ liệu mẫu cho nhà cung cấp
const supplierData = [
  {
    id: "NCC001",
    name: "Công ty TNHH Thời trang ABC",
    contact: "Nguyễn Văn X",
    phone: "0901234567",
    email: "contact@abc.com",
    address: "123 Nguyễn Trãi, Q.1, TP.HCM",
  },
  {
    id: "NCC002",
    name: "Công ty CP May mặc XYZ",
    contact: "Trần Văn Y",
    phone: "0909876543",
    email: "info@xyz.com",
    address: "456 Lê Lợi, Q.1, TP.HCM",
  },
  {
    id: "NCC003",
    name: "Công ty TNHH Phụ kiện DEF",
    contact: "Lê Thị Z",
    phone: "0905555666",
    email: "sales@def.com",
    address: "789 Cách Mạng Tháng 8, Q.3, TP.HCM",
  },
]

// Dữ liệu mẫu cho sản phẩm
const productData = [
  {
    id: "SP001",
    name: "Áo thun nam basic",
    sku: "ATN001",
    barcode: "8936082730015",
    category: "Áo nam",
    price: 150000,
    importPrice: 100000,
  },
  {
    id: "SP002",
    name: "Áo sơ mi nữ trắng",
    sku: "ASN001",
    barcode: "8936082730022",
    category: "Áo nữ",
    price: 250000,
    importPrice: 180000,
  },
  {
    id: "SP003",
    name: "Quần jean nam slim fit",
    sku: "QJN001",
    barcode: "8936082730039",
    category: "Quần nam",
    price: 450000,
    importPrice: 320000,
  },
  {
    id: "SP004",
    name: "Váy liền thân nữ",
    sku: "VLN001",
    barcode: "8936082730046",
    category: "Váy nữ",
    price: 350000,
    importPrice: 250000,
  },
  {
    id: "SP005",
    name: "Áo khoác denim unisex",
    sku: "AKD001",
    barcode: "8936082730053",
    category: "Áo khoác",
    price: 550000,
    importPrice: 400000,
  },
]

// Dữ liệu mẫu cho chi tiết phiếu nhập
const importDetailData = [
  {
    id: 1,
    productId: "SP001",
    productName: "Áo thun nam basic",
    sku: "ATN001",
    quantity: 50,
    importPrice: 100000,
    totalPrice: 5000000,
  },
  {
    id: 2,
    productId: "SP002",
    productName: "Áo sơ mi nữ trắng",
    sku: "ASN001",
    quantity: 30,
    importPrice: 180000,
    totalPrice: 5400000,
  },
  {
    id: 3,
    productId: "SP003",
    productName: "Quần jean nam slim fit",
    sku: "QJN001",
    quantity: 20,
    importPrice: 320000,
    totalPrice: 6400000,
  },
  {
    id: 4,
    productId: "SP005",
    productName: "Áo khoác denim unisex",
    sku: "AKD001",
    quantity: 20,
    importPrice: 400000,
    totalPrice: 8000000,
  },
]

export default function InventoryImportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddImportOpen, setIsAddImportOpen] = useState(false)
  const [isImportDetailOpen, setIsImportDetailOpen] = useState(false)
  const [selectedImport, setSelectedImport] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  // Lọc phiếu nhập theo từ khóa tìm kiếm và tab
  const filteredImports = importData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && item.status === activeTab
  })

  // Xem chi tiết phiếu nhập
  const handleViewDetail = (importItem) => {
    setSelectedImport(importItem)
    setIsImportDetailOpen(true)
  }

  // Định dạng trạng thái phiếu nhập
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Hoàn thành</Badge>
      case "pending":
        return <Badge variant="warning">Đang xử lý</Badge>
      case "draft":
        return <Badge variant="outline">Nháp</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nhập kho</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            Lọc
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm phiếu nhập..."
              className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddImportOpen} onOpenChange={setIsAddImportOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 gap-1">
                <PlusCircle className="h-4 w-4" />
                Tạo phiếu nhập
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <DialogHeader>
                <DialogTitle>Tạo phiếu nhập kho mới</DialogTitle>
                <DialogDescription>Tạo phiếu nhập kho mới để cập nhật hàng hóa vào kho.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Nhà cung cấp</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhà cung cấp" />
                      </SelectTrigger>
                      <SelectContent>
                        {supplierData.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Ngày nhập</Label>
                    <Input type="date" id="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea id="note" placeholder="Nhập ghi chú cho phiếu nhập kho" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Danh sách sản phẩm</h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Thêm sản phẩm
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Đơn giá nhập</TableHead>
                        <TableHead>Thành tiền</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Chưa có sản phẩm nào. Vui lòng thêm sản phẩm vào phiếu nhập.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tổng số sản phẩm: <span className="font-medium text-foreground">0</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Tổng giá trị nhập:</p>
                    <p className="text-xl font-bold">0 đ</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddImportOpen(false)}>
                    Hủy
                  </Button>
                  <Button variant="secondary">Lưu nháp</Button>
                </div>
                <Button type="submit">Hoàn thành nhập kho</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          <TabsTrigger value="pending">Đang xử lý</TabsTrigger>
          <TabsTrigger value="draft">Nháp</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách phiếu nhập kho</CardTitle>
              <CardDescription>Quản lý tất cả các phiếu nhập kho trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã phiếu</TableHead>
                    <TableHead>Ngày nhập</TableHead>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead>Số lượng SP</TableHead>
                    <TableHead>Tổng giá trị</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Người tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        Không tìm thấy phiếu nhập kho nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredImports.map((importItem) => (
                      <TableRow key={importItem.id} className="group hover:bg-muted/50">
                        <TableCell className="font-medium">{importItem.id}</TableCell>
                        <TableCell>{new Date(importItem.date).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell>{importItem.supplier}</TableCell>
                        <TableCell>{importItem.totalItems}</TableCell>
                        <TableCell>{importItem.totalValue.toLocaleString("vi-VN")}đ</TableCell>
                        <TableCell>{getStatusBadge(importItem.status)}</TableCell>
                        <TableCell>{importItem.createdBy}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Mở menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => handleViewDetail(importItem)}
                              >
                                <FileText className="h-4 w-4" /> Xem chi tiết
                              </DropdownMenuItem>
                              {importItem.status !== "completed" && (
                                <>
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Pencil className="h-4 w-4" /> Chỉnh sửa
                                  </DropdownMenuItem>
                                  {importItem.status === "pending" && (
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <CheckCircle2 className="h-4 w-4" /> Hoàn thành
                                    </DropdownMenuItem>
                                  )}
                                </>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Xuất PDF
                              </DropdownMenuItem>
                              {importItem.status === "draft" && <DropdownMenuSeparator />}
                              {importItem.status === "draft" && (
                                <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                                  <Trash2 className="h-4 w-4" /> Xóa
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog xem chi tiết phiếu nhập */}
      <Dialog open={isImportDetailOpen} onOpenChange={setIsImportDetailOpen}>
        <DialogContent className="sm:max-w-[900px]">
          {selectedImport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Chi tiết phiếu nhập #{selectedImport.id}
                  <span className="ml-2">{getStatusBadge(selectedImport.status)}</span>
                </DialogTitle>
                <DialogDescription>Thông tin chi tiết về phiếu nhập kho.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Nhà cung cấp</p>
                    <p>{selectedImport.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Ngày nhập</p>
                    <p>{new Date(selectedImport.date).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Ghi chú</p>
                  <p>{selectedImport.note}</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Danh sách sản phẩm</h3>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead className="text-right">Đơn giá nhập</TableHead>
                        <TableHead className="text-right">Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importDetailData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.productId}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.importPrice.toLocaleString("vi-VN")}đ</TableCell>
                          <TableCell className="text-right">{item.totalPrice.toLocaleString("vi-VN")}đ</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tổng số sản phẩm: <span className="font-medium text-foreground">{selectedImport.totalItems}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Người tạo: <span className="font-medium text-foreground">{selectedImport.createdBy}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Tổng giá trị nhập:</p>
                    <p className="text-xl font-bold">{selectedImport.totalValue.toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDetailOpen(false)}>
                  Đóng
                </Button>
                <Button variant="secondary" className="gap-1">
                  <Download className="h-4 w-4" /> Xuất PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
