"use client"

import { useState } from "react"
import { PlusCircle, Search, Filter, MoreHorizontal, Pencil, Trash2, Copy } from "lucide-react"
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

// Dữ liệu mẫu cho biến thể sản phẩm
const variantData = [
  {
    id: "VAR001",
    name: "Áo thun nam - Size S - Màu đen",
    baseProduct: "Áo thun nam basic",
    attributes: [
      { name: "Size", value: "S" },
      { name: "Màu sắc", value: "Đen" },
    ],
    sku: "AT-NAM-S-DEN",
    barcode: "8936082730015",
    price: 150000,
    stock: 25,
    status: "active",
  },
  {
    id: "VAR002",
    name: "Áo thun nam - Size M - Màu đen",
    baseProduct: "Áo thun nam basic",
    attributes: [
      { name: "Size", value: "M" },
      { name: "Màu sắc", value: "Đen" },
    ],
    sku: "AT-NAM-M-DEN",
    barcode: "8936082730022",
    price: 150000,
    stock: 30,
    status: "active",
  },
  {
    id: "VAR003",
    name: "Áo thun nam - Size L - Màu đen",
    baseProduct: "Áo thun nam basic",
    attributes: [
      { name: "Size", value: "L" },
      { name: "Màu sắc", value: "Đen" },
    ],
    sku: "AT-NAM-L-DEN",
    barcode: "8936082730039",
    price: 150000,
    stock: 20,
    status: "active",
  },
  {
    id: "VAR004",
    name: "Áo thun nam - Size S - Màu trắng",
    baseProduct: "Áo thun nam basic",
    attributes: [
      { name: "Size", value: "S" },
      { name: "Màu sắc", value: "Trắng" },
    ],
    sku: "AT-NAM-S-TRANG",
    barcode: "8936082730046",
    price: 150000,
    stock: 15,
    status: "active",
  },
  {
    id: "VAR005",
    name: "Áo thun nam - Size M - Màu trắng",
    baseProduct: "Áo thun nam basic",
    attributes: [
      { name: "Size", value: "M" },
      { name: "Màu sắc", value: "Trắng" },
    ],
    sku: "AT-NAM-M-TRANG",
    barcode: "8936082730053",
    price: 150000,
    stock: 18,
    status: "active",
  },
  {
    id: "VAR006",
    name: "Quần jean nữ - Size 28 - Màu xanh đậm",
    baseProduct: "Quần jean nữ ống rộng",
    attributes: [
      { name: "Size", value: "28" },
      { name: "Màu sắc", value: "Xanh đậm" },
    ],
    sku: "QJ-NU-28-XDAM",
    barcode: "8936082730060",
    price: 350000,
    stock: 12,
    status: "active",
  },
  {
    id: "VAR007",
    name: "Quần jean nữ - Size 29 - Màu xanh đậm",
    baseProduct: "Quần jean nữ ống rộng",
    attributes: [
      { name: "Size", value: "29" },
      { name: "Màu sắc", value: "Xanh đậm" },
    ],
    sku: "QJ-NU-29-XDAM",
    barcode: "8936082730077",
    price: 350000,
    stock: 10,
    status: "active",
  },
  {
    id: "VAR008",
    name: "Quần jean nữ - Size 30 - Màu xanh đậm",
    baseProduct: "Quần jean nữ ống rộng",
    attributes: [
      { name: "Size", value: "30" },
      { name: "Màu sắc", value: "Xanh đậm" },
    ],
    sku: "QJ-NU-30-XDAM",
    barcode: "8936082730084",
    price: 350000,
    stock: 8,
    status: "active",
  },
]

// Dữ liệu mẫu cho thuộc tính
const attributeData = [
  {
    id: "ATT001",
    name: "Size",
    values: ["S", "M", "L", "XL", "XXL", "28", "29", "30", "31", "32"],
  },
  {
    id: "ATT002",
    name: "Màu sắc",
    values: ["Đen", "Trắng", "Đỏ", "Xanh đậm", "Xanh nhạt", "Vàng", "Hồng"],
  },
  {
    id: "ATT003",
    name: "Chất liệu",
    values: ["Cotton", "Polyester", "Linen", "Denim", "Len", "Lụa"],
  },
]

// Dữ liệu mẫu cho sản phẩm cơ bản
const baseProductData = [
  {
    id: "BP001",
    name: "Áo thun nam basic",
    category: "Áo nam",
    attributes: ["Size", "Màu sắc"],
  },
  {
    id: "BP002",
    name: "Quần jean nữ ống rộng",
    category: "Quần nữ",
    attributes: ["Size", "Màu sắc"],
  },
  {
    id: "BP003",
    name: "Áo sơ mi nữ công sở",
    category: "Áo nữ",
    attributes: ["Size", "Màu sắc", "Chất liệu"],
  },
]

export default function ProductVariantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false)
  const [isAddAttributeOpen, setIsAddAttributeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("variants")

  // Lọc biến thể theo từ khóa tìm kiếm
  const filteredVariants = variantData.filter(
    (variant) =>
      variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.baseProduct.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Biến thể sản phẩm</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            Lọc
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddVariantOpen} onOpenChange={setIsAddVariantOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 gap-1">
                <PlusCircle className="h-4 w-4" />
                Thêm biến thể
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm biến thể sản phẩm mới</DialogTitle>
                <DialogDescription>
                  Tạo biến thể mới cho sản phẩm đã có. Điền đầy đủ thông tin bên dưới.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="baseProduct" className="text-right">
                    Sản phẩm gốc
                  </Label>
                  <div className="col-span-3">
                    <select
                      id="baseProduct"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Chọn sản phẩm gốc</option>
                      {baseProductData.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="size" className="text-right">
                    Size
                  </Label>
                  <div className="col-span-3">
                    <select
                      id="size"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Chọn size</option>
                      {attributeData
                        .find((att) => att.name === "Size")
                        ?.values.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right">
                    Màu sắc
                  </Label>
                  <div className="col-span-3">
                    <select
                      id="color"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Chọn màu sắc</option>
                      {attributeData
                        .find((att) => att.name === "Màu sắc")
                        ?.values.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sku" className="text-right">
                    Mã SKU
                  </Label>
                  <Input id="sku" className="col-span-3" placeholder="Nhập mã SKU" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="barcode" className="text-right">
                    Mã vạch
                  </Label>
                  <Input id="barcode" className="col-span-3" placeholder="Nhập mã vạch" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Giá bán
                  </Label>
                  <Input id="price" type="number" className="col-span-3" placeholder="Nhập giá bán" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Tồn kho
                  </Label>
                  <Input id="stock" type="number" className="col-span-3" placeholder="Nhập số lượng tồn kho" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddVariantOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu biến thể</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="variants">Biến thể sản phẩm</TabsTrigger>
          <TabsTrigger value="attributes">Thuộc tính</TabsTrigger>
          <TabsTrigger value="baseProducts">Sản phẩm gốc</TabsTrigger>
        </TabsList>

        <TabsContent value="variants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách biến thể sản phẩm</CardTitle>
              <CardDescription>Quản lý tất cả các biến thể sản phẩm trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã biến thể</TableHead>
                    <TableHead>Tên biến thể</TableHead>
                    <TableHead>Sản phẩm gốc</TableHead>
                    <TableHead>Thuộc tính</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVariants.map((variant) => (
                    <TableRow key={variant.id} className="group hover:bg-muted/50">
                      <TableCell className="font-medium">{variant.id}</TableCell>
                      <TableCell>{variant.name}</TableCell>
                      <TableCell>{variant.baseProduct}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {variant.attributes.map((attr, index) => (
                            <Badge key={index} variant="outline" className="whitespace-nowrap">
                              {attr.name}: {attr.value}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{variant.sku}</TableCell>
                      <TableCell>{variant.price.toLocaleString("vi-VN")}đ</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                      <TableCell>
                        <Badge variant={variant.status === "active" ? "success" : "destructive"}>
                          {variant.status === "active" ? "Đang bán" : "Ngừng bán"}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Pencil className="h-4 w-4" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Copy className="h-4 w-4" /> Nhân bản
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" /> Xóa
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
        </TabsContent>

        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Thuộc tính sản phẩm</CardTitle>
                <CardDescription>Quản lý các thuộc tính dùng để tạo biến thể sản phẩm.</CardDescription>
              </div>
              <Dialog open={isAddAttributeOpen} onOpenChange={setIsAddAttributeOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-9 gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Thêm thuộc tính
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Thêm thuộc tính mới</DialogTitle>
                    <DialogDescription>Tạo thuộc tính mới để sử dụng cho biến thể sản phẩm.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attributeName" className="text-right">
                        Tên thuộc tính
                      </Label>
                      <Input id="attributeName" className="col-span-3" placeholder="Ví dụ: Kích thước, Màu sắc..." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attributeValues" className="text-right">
                        Giá trị
                      </Label>
                      <div className="col-span-3">
                        <Input id="attributeValues" placeholder="Nhập các giá trị, phân cách bằng dấu phẩy" />
                        <p className="text-sm text-muted-foreground mt-1">Ví dụ: S, M, L, XL hoặc Đỏ, Xanh, Vàng</p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddAttributeOpen(false)}>
                      Hủy
                    </Button>
                    <Button type="submit">Lưu thuộc tính</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã thuộc tính</TableHead>
                    <TableHead>Tên thuộc tính</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attributeData.map((attribute) => (
                    <TableRow key={attribute.id} className="group hover:bg-muted/50">
                      <TableCell className="font-medium">{attribute.id}</TableCell>
                      <TableCell>{attribute.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {attribute.values.map((value, index) => (
                            <Badge key={index} variant="outline" className="whitespace-nowrap">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Pencil className="h-4 w-4" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" /> Xóa
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
        </TabsContent>

        <TabsContent value="baseProducts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm gốc</CardTitle>
              <CardDescription>Danh sách các sản phẩm gốc có thể tạo biến thể.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã sản phẩm</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Thuộc tính biến thể</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {baseProductData.map((product) => (
                    <TableRow key={product.id} className="group hover:bg-muted/50">
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.attributes.map((attr, index) => (
                            <Badge key={index} variant="outline" className="whitespace-nowrap">
                              {attr}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          Tạo biến thể
                        </Button>
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
