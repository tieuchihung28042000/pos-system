"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Search,
  Filter,
  PackageOpen,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  currentStock: number
  minStock: number
  value: number
  movement: "high" | "medium" | "low" | "none"
  status: "in-stock" | "low-stock" | "out-of-stock"
  lastUpdated: string
}

export default function InventoryReportPage() {
  const [period, setPeriod] = useState("this-month")
  const [chartType, setChartType] = useState("bar")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem
    direction: "asc" | "desc"
  } | null>({ key: "currentStock", direction: "desc" })

  // Danh sách tồn kho mẫu
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      sku: "CF001",
      name: "Cà phê đen",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      value: 1500000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "2",
      sku: "CF002",
      name: "Cà phê sữa",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      value: 1800000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "3",
      sku: "CF003",
      name: "Bạc xỉu",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      value: 2000000,
      movement: "medium",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "4",
      sku: "CF004",
      name: "Cà phê đen đá",
      category: "coffee",
      currentStock: 100,
      minStock: 20,
      value: 1500000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "5",
      sku: "TE001",
      name: "Trà đào",
      category: "tea",
      currentStock: 50,
      minStock: 15,
      value: 1100000,
      movement: "medium",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "6",
      sku: "TE002",
      name: "Trà vải",
      category: "tea",
      currentStock: 50,
      minStock: 15,
      value: 1100000,
      movement: "medium",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "7",
      sku: "TE003",
      name: "Trà sen",
      category: "tea",
      currentStock: 5,
      minStock: 15,
      value: 110000,
      movement: "high",
      status: "low-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "8",
      sku: "MT001",
      name: "Trà sữa trân châu",
      category: "milk-tea",
      currentStock: 80,
      minStock: 20,
      value: 2000000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "9",
      sku: "MT002",
      name: "Trà sữa matcha",
      category: "milk-tea",
      currentStock: 80,
      minStock: 20,
      value: 2000000,
      movement: "medium",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "10",
      sku: "MT003",
      name: "Trà sữa socola",
      category: "milk-tea",
      currentStock: 0,
      minStock: 20,
      value: 0,
      movement: "low",
      status: "out-of-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "11",
      sku: "FD001",
      name: "Bánh mì thịt",
      category: "food",
      currentStock: 30,
      minStock: 10,
      value: 360000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
    {
      id: "12",
      sku: "FD002",
      name: "Bánh mì gà",
      category: "food",
      currentStock: 30,
      minStock: 10,
      value: 360000,
      movement: "high",
      status: "in-stock",
      lastUpdated: "15/05/2023",
    },
  ])

  // Sắp xếp sản phẩm
  const sortedInventory = [...inventory]
  if (sortConfig) {
    sortedInventory.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  // Xử lý sắp xếp
  const handleSort = (key: keyof InventoryItem) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Lọc sản phẩm
  const filteredInventory = sortedInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
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

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Tính tổng giá trị tồn kho
  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.value, 0)

  // Tính số lượng sản phẩm sắp hết hàng
  const lowStockCount = inventory.filter((item) => item.status === "low-stock").length

  // Tính số lượng sản phẩm hết hàng
  const outOfStockCount = inventory.filter((item) => item.status === "out-of-stock").length

  // Tính số lượng sản phẩm có tồn kho cao
  const highStockItems = inventory.filter((item) => item.currentStock > item.minStock * 3).length

  // Thống kê theo danh mục
  const categoryStats = Object.entries(
    inventory.reduce(
      (stats, item) => {
        const category = getCategoryName(item.category)
        if (!stats[category]) {
          stats[category] = {
            count: 0,
            value: 0,
          }
        }
        stats[category].count += 1
        stats[category].value += item.value
        return stats
      },
      {} as Record<string, { count: number; value: number }>,
    ),
  )
    .map(([category, stats]) => ({
      category,
      ...stats,
      percentage: (stats.value / totalInventoryValue) * 100,
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Báo cáo tồn kho</h1>
          <p className="text-muted-foreground">Phân tích tồn kho và giá trị hàng hóa theo thời gian</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="this-week">Tuần này</SelectItem>
              <SelectItem value="last-week">Tuần trước</SelectItem>
              <SelectItem value="this-month">Tháng này</SelectItem>
              <SelectItem value="last-month">Tháng trước</SelectItem>
              <SelectItem value="this-year">Năm nay</SelectItem>
              <SelectItem value="custom">Tùy chỉnh...</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng giá trị tồn kho</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalInventoryValue)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                +5.2% so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản phẩm tồn kho cao</CardTitle>
              <PackageOpen className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highStockItems}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 text-amber-500 mr-1" />
                +2 so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản phẩm sắp hết hàng</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{lowStockCount}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 text-red-500 mr-1" />
                -1 so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản phẩm hết hàng</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{outOfStockCount}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 text-green-500 mr-1" />
                -2 so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="inventory-list">Danh sách tồn kho</TabsTrigger>
              <TabsTrigger value="category-analysis">Phân tích theo danh mục</TabsTrigger>
              <TabsTrigger value="movement">Biến động tồn kho</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Biểu đồ giá trị tồn kho theo thời gian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">Biểu đồ giá trị tồn kho theo thời gian</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Phân bổ giá trị tồn kho theo danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryStats.map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{stat.category}</span>
                          <span className="font-medium">{formatCurrency(stat.value)}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${stat.percentage}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{stat.count} sản phẩm</span>
                          <span>{stat.percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory-list">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách tồn kho</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <div className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            <span>Trạng thái</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="in-stock">Còn hàng</SelectItem>
                          <SelectItem value="low-stock">Sắp hết</SelectItem>
                          <SelectItem value="out-of-stock">Hết hàng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Mã SKU</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => handleSort("currentStock")}>
                          Tồn kho
                          {sortConfig?.key === "currentStock" && (
                            <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                          )}
                        </TableHead>
                        <TableHead>Tồn kho tối thiểu</TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => handleSort("value")}>
                          Giá trị
                          {sortConfig?.key === "value" && (
                            <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                          )}
                        </TableHead>
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
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{getCategoryName(item.category)}</TableCell>
                            <TableCell className="text-right">{item.currentStock}</TableCell>
                            <TableCell>{item.minStock}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                            <TableCell>{item.lastUpdated}</TableCell>
                            <TableCell className="text-right">
                              {item.status === "out-of-stock" ? (
                                <Badge variant="destructive">Hết hàng</Badge>
                              ) : item.status === "low-stock" ? (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category-analysis">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích giá trị tồn kho theo danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">Biểu đồ giá trị tồn kho theo danh mục</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách giá trị theo danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Danh mục</TableHead>
                        <TableHead className="text-right">Số lượng SP</TableHead>
                        <TableHead className="text-right">Giá trị</TableHead>
                        <TableHead className="text-right">Tỷ lệ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryStats.map((stat, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{stat.category}</TableCell>
                          <TableCell className="text-right">{stat.count}</TableCell>
                          <TableCell className="text-right">{formatCurrency(stat.value)}</TableCell>
                          <TableCell className="text-right">{stat.percentage.toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50">
                        <TableCell className="font-bold">Tổng cộng</TableCell>
                        <TableCell className="text-right font-bold">{inventory.length}</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(totalInventoryValue)}</TableCell>
                        <TableCell className="text-right font-bold">100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="movement">
            <Card>
              <CardHeader>
                <CardTitle>Biến động tồn kho trong 30 ngày qua</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Biểu đồ biến động tồn kho trong 30 ngày qua</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
