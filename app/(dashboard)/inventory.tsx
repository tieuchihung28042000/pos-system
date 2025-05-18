"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Plus, Filter, ArrowUpDown, Download, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InventoryItem {
  id: string
  productName: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  lastUpdated: string
  location: string
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  // Danh sách tồn kho mẫu
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      productName: "Cà phê đen",
      sku: "CF001",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "2",
      productName: "Cà phê sữa",
      sku: "CF002",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "3",
      productName: "Bạc xỉu",
      sku: "CF003",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "4",
      productName: "Cà phê đen đá",
      sku: "CF004",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "5",
      productName: "Trà đào",
      sku: "TE001",
      category: "tea",
      currentStock: 50,
      minStock: 15,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "6",
      productName: "Trà vải",
      sku: "TE002",
      category: "tea",
      currentStock: 50,
      minStock: 15,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "7",
      productName: "Trà sen",
      sku: "TE003",
      category: "tea",
      currentStock: 5,
      minStock: 15,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "8",
      productName: "Trà sữa trân châu",
      sku: "MT001",
      category: "milk-tea",
      currentStock: 80,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "9",
      productName: "Trà sữa matcha",
      sku: "MT002",
      category: "milk-tea",
      currentStock: 80,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "10",
      productName: "Trà sữa socola",
      sku: "MT003",
      category: "milk-tea",
      currentStock: 0,
      minStock: 20,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "11",
      productName: "Bánh mì thịt",
      sku: "FD001",
      category: "food",
      currentStock: 30,
      minStock: 10,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
    {
      id: "12",
      productName: "Bánh mì gà",
      sku: "FD002",
      category: "food",
      currentStock: 30,
      minStock: 10,
      lastUpdated: "15/05/2023",
      location: "Kho chính",
    },
  ])

  // Lọc sản phẩm
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.currentStock < item.minStock) ||
      (stockFilter === "out" && item.currentStock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

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

  // Tính số lượng sản phẩm sắp hết hàng
  const lowStockCount = inventory.filter((item) => item.currentStock < item.minStock && item.currentStock > 0).length

  // Tính số lượng sản phẩm hết hàng
  const outOfStockCount = inventory.filter((item) => item.currentStock === 0).length

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Quản lý kho hàng</h1>
          <p className="text-muted-foreground">Theo dõi tồn kho và quản lý xuất nhập kho</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/inventory/check">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Kiểm kho
            </Link>
          </Button>
          <Button asChild>
            <Link href="/inventory/import">
              <Plus className="mr-2 h-4 w-4" />
              Nhập kho
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản phẩm còn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length - outOfStockCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{lowStockCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hết hàng</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{outOfStockCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, mã SKU..."
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
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Mã SKU</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Tồn kho hiện tại</TableHead>
                <TableHead className="text-right">Tồn kho tối thiểu</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Cập nhật lần cuối</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{getCategoryName(item.category)}</TableCell>
                    <TableCell className="text-right">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.minStock}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      {item.currentStock === 0 ? (
                        <Badge variant="destructive">Hết hàng</Badge>
                      ) : item.currentStock < item.minStock ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Còn hàng
                        </Badge>
                      )}
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
