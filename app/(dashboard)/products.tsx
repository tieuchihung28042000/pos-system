"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Download, Upload, Filter } from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  barcode?: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  image: string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  // Danh sách sản phẩm mẫu
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Cà phê đen",
      sku: "CF001",
      barcode: "8938505420066",
      category: "coffee",
      price: 29000,
      cost: 15000,
      stock: 100,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Cà phê sữa",
      sku: "CF002",
      barcode: "8938505420073",
      category: "coffee",
      price: 35000,
      cost: 18000,
      stock: 100,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Bạc xỉu",
      sku: "CF003",
      barcode: "8938505420080",
      category: "coffee",
      price: 39000,
      cost: 20000,
      stock: 100,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Cà phê đen đá",
      sku: "CF004",
      barcode: "8938505420097",
      category: "coffee",
      price: 29000,
      cost: 15000,
      stock: 100,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Trà đào",
      sku: "TE001",
      barcode: "8938505420103",
      category: "tea",
      price: 45000,
      cost: 22000,
      stock: 50,
      minStock: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Trà vải",
      sku: "TE002",
      barcode: "8938505420110",
      category: "tea",
      price: 45000,
      cost: 22000,
      stock: 50,
      minStock: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Trà sen",
      sku: "TE003",
      barcode: "8938505420127",
      category: "tea",
      price: 45000,
      cost: 22000,
      stock: 5,
      minStock: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "Trà sữa trân châu",
      sku: "MT001",
      barcode: "8938505420134",
      category: "milk-tea",
      price: 50000,
      cost: 25000,
      stock: 80,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      name: "Trà sữa matcha",
      sku: "MT002",
      barcode: "8938505420141",
      category: "milk-tea",
      price: 50000,
      cost: 25000,
      stock: 80,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      name: "Trà sữa socola",
      sku: "MT003",
      barcode: "8938505420158",
      category: "milk-tea",
      price: 50000,
      cost: 25000,
      stock: 0,
      minStock: 20,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      name: "Bánh mì thịt",
      sku: "FD001",
      barcode: "8938505420165",
      category: "food",
      price: 25000,
      cost: 12000,
      stock: 30,
      minStock: 10,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      name: "Bánh mì gà",
      sku: "FD002",
      barcode: "8938505420172",
      category: "food",
      price: 25000,
      cost: 12000,
      stock: 30,
      minStock: 10,
      image: "/placeholder.svg?height=40&width=40",
    },
  ])

  // Lọc sản phẩm
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm))

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock < product.minStock) ||
      (stockFilter === "out" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Lấy tên danh mục
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      coffee: "Cà phê",
      tea: "Trà",
      "milk-tea": "Trà sữa",
      food: "Thức ăn",
      combo: "Combo",
    }
    return categories[category] || category
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">Quản lý danh sách sản phẩm, giá cả và tồn kho</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/product/add">
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, mã SKU, mã vạch..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Danh mục</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="coffee">Cà phê</SelectItem>
                  <SelectItem value="tea">Trà</SelectItem>
                  <SelectItem value="milk-tea">Trà sữa</SelectItem>
                  <SelectItem value="food">Thức ăn</SelectItem>
                  <SelectItem value="combo">Combo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Tồn kho</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="low">Sắp hết hàng</SelectItem>
                  <SelectItem value="out">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Mã SKU</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Giá bán</TableHead>
                <TableHead className="text-right">Giá nhập</TableHead>
                <TableHead className="text-right">Tồn kho</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{getCategoryName(product.category)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.cost)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">
                      {product.stock === 0 ? (
                        <Badge variant="destructive">Hết hàng</Badge>
                      ) : product.stock < product.minStock ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Còn hàng
                        </Badge>
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
