"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  ArrowLeft,
  Save,
  FilterX,
  ScanBarcodeIcon as BarcodeScan,
  AlertCircle,
  CheckCircle2,
  Info,
  Upload,
  Download,
  Printer,
} from "lucide-react"

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  systemStock: number
  actualStock: number
  difference: number
  status: "pending" | "ok" | "discrepancy" | "missing"
  unit: string
}

export default function InventoryCheckPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [note, setNote] = useState("")
  const [currentDate] = useState(new Date().toLocaleDateString("vi-VN"))
  const [checkId] = useState(
    `KT-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
  )
  const [checkedItems, setCheckedItems] = useState<number>(0)
  const [discrepancyItems, setDiscrepancyItems] = useState<number>(0)

  // Danh sách hàng hóa kiểm kho
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      sku: "CF001",
      name: "Cà phê đen",
      category: "coffee",
      systemStock: 100,
      actualStock: 100,
      difference: 0,
      status: "pending",
      unit: "gói",
    },
    {
      id: "2",
      sku: "CF002",
      name: "Cà phê sữa",
      category: "coffee",
      systemStock: 100,
      actualStock: 0,
      difference: -100,
      status: "pending",
      unit: "gói",
    },
    {
      id: "3",
      sku: "CF003",
      name: "Bạc xỉu",
      category: "coffee",
      systemStock: 100,
      actualStock: 0,
      difference: -100,
      status: "pending",
      unit: "gói",
    },
    {
      id: "4",
      sku: "CF004",
      name: "Cà phê đen đá",
      category: "coffee",
      systemStock: 100,
      actualStock: 0,
      difference: -100,
      status: "pending",
      unit: "gói",
    },
    {
      id: "5",
      sku: "TE001",
      name: "Trà đào",
      category: "tea",
      systemStock: 50,
      actualStock: 0,
      difference: -50,
      status: "pending",
      unit: "gói",
    },
    {
      id: "6",
      sku: "TE002",
      name: "Trà vải",
      category: "tea",
      systemStock: 50,
      actualStock: 0,
      difference: -50,
      status: "pending",
      unit: "gói",
    },
    {
      id: "7",
      sku: "TE003",
      name: "Trà sen",
      category: "tea",
      systemStock: 5,
      actualStock: 0,
      difference: -5,
      status: "pending",
      unit: "gói",
    },
    {
      id: "8",
      sku: "MT001",
      name: "Trà sữa trân châu",
      category: "milk-tea",
      systemStock: 80,
      actualStock: 0,
      difference: -80,
      status: "pending",
      unit: "gói",
    },
    {
      id: "9",
      sku: "MT002",
      name: "Trà sữa matcha",
      category: "milk-tea",
      systemStock: 80,
      actualStock: 0,
      difference: -80,
      status: "pending",
      unit: "gói",
    },
    {
      id: "10",
      sku: "MT003",
      name: "Trà sữa socola",
      category: "milk-tea",
      systemStock: 0,
      actualStock: 0,
      difference: 0,
      status: "pending",
      unit: "gói",
    },
  ])

  // Lọc sản phẩm
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Cập nhật số lượng thực tế
  const updateActualStock = (id: string, value: number) => {
    setInventoryItems(
      inventoryItems.map((item) => {
        if (item.id === id) {
          const actualStock = Math.max(0, value) // Không cho phép số âm
          const difference = actualStock - item.systemStock
          const status =
            actualStock === 0 && item.systemStock === 0
              ? "ok"
              : actualStock === item.systemStock
                ? "ok"
                : actualStock === 0 && item.systemStock > 0
                  ? "missing"
                  : "discrepancy"

          // Nếu đây là lần đầu cập nhật (chuyển từ pending), tăng số lượng đã kiểm
          if (item.status === "pending" && status !== "pending") {
            setCheckedItems((prev) => prev + 1)

            // Nếu có sự khác biệt, tăng số lượng sản phẩm lệch
            if (status === "discrepancy" || status === "missing") {
              setDiscrepancyItems((prev) => prev + 1)
            }
          }
          // Nếu chuyển từ discrepancy/missing sang ok, giảm số lượng sản phẩm lệch
          else if ((item.status === "discrepancy" || item.status === "missing") && status === "ok") {
            setDiscrepancyItems((prev) => prev - 1)
          }
          // Nếu chuyển từ ok sang discrepancy/missing, tăng số lượng sản phẩm lệch
          else if (item.status === "ok" && (status === "discrepancy" || status === "missing")) {
            setDiscrepancyItems((prev) => prev + 1)
          }

          return {
            ...item,
            actualStock,
            difference,
            status,
          }
        }
        return item
      }),
    )
  }

  // Cập nhật tất cả sản phẩm bằng với số lượng hệ thống
  const updateAllToSystem = () => {
    setInventoryItems(
      inventoryItems.map((item) => ({
        ...item,
        actualStock: item.systemStock,
        difference: 0,
        status: item.systemStock === 0 ? "ok" : "ok",
      })),
    )
    setCheckedItems(inventoryItems.length)
    setDiscrepancyItems(0)
  }

  // Reset tất cả về trạng thái ban đầu
  const resetAll = () => {
    setInventoryItems(
      inventoryItems.map((item) => ({
        ...item,
        actualStock: 0,
        difference: -item.systemStock,
        status: "pending",
      })),
    )
    setCheckedItems(0)
    setDiscrepancyItems(0)
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

  // Hoàn tất kiểm kho
  const completeInventoryCheck = () => {
    // Xử lý lưu dữ liệu và chuyển hướng
    console.log("Hoàn tất kiểm kho:", {
      items: inventoryItems,
      note,
      checkId,
      date: currentDate,
    })
    router.push("/inventory")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Kiểm kho #{checkId}</h1>
            <p className="text-muted-foreground">Ngày kiểm kho: {currentDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/inventory")}>
            Hủy
          </Button>
          <Button onClick={completeInventoryCheck}>
            <Save className="mr-2 h-4 w-4" />
            Hoàn tất kiểm kho
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Thông tin kiểm kho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Mã kiểm kho:</p>
                  <p className="text-xl font-bold">{checkId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Ngày kiểm kho:</p>
                  <p>{currentDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Người thực hiện:</p>
                  <p>Nguyễn Văn A</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Kho:</p>
                  <p>Kho chính</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Ghi chú:</p>
                <Textarea
                  placeholder="Nhập ghi chú về đợt kiểm kho này"
                  className="min-h-[80px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Tiến độ kiểm kho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Đã kiểm:</span>
                <span className="font-bold">
                  {checkedItems}/{inventoryItems.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(checkedItems / inventoryItems.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sản phẩm lệch:</span>
                <span className={`font-bold ${discrepancyItems > 0 ? "text-red-500" : "text-green-500"}`}>
                  {discrepancyItems}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" onClick={resetAll} className="w-[48%]">
                <FilterX className="mr-2 h-4 w-4" />
                Làm mới
              </Button>
              <Button onClick={updateAllToSystem} className="w-[48%]">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Đồng bộ
              </Button>
            </CardFooter>
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
                    <span>Trạng thái</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chưa kiểm</SelectItem>
                  <SelectItem value="ok">Đúng</SelectItem>
                  <SelectItem value="discrepancy">Lệch</SelectItem>
                  <SelectItem value="missing">Thiếu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <BarcodeScan className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Quét mã vạch..." className="pl-8 w-48" />
            </div>
          </div>
        </div>

        <div className="border rounded-md mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã SKU</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Tồn kho hệ thống</TableHead>
                <TableHead className="text-right">Tồn kho thực tế</TableHead>
                <TableHead className="text-right">Chênh lệch</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{getCategoryName(item.category)}</TableCell>
                    <TableCell className="text-right">
                      {item.systemStock} {item.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        min="0"
                        className="w-20 ml-auto text-right"
                        value={item.actualStock}
                        onChange={(e) => updateActualStock(item.id, Number.parseInt(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        item.difference === 0
                          ? "text-green-600"
                          : item.difference > 0
                            ? "text-blue-600"
                            : "text-red-600"
                      }`}
                    >
                      {item.difference > 0 ? "+" : ""}
                      {item.difference} {item.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.status === "pending" ? (
                        <Badge variant="outline" className="ml-auto">
                          Chưa kiểm
                        </Badge>
                      ) : item.status === "ok" ? (
                        <Badge className="bg-green-500 ml-auto">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Đúng
                        </Badge>
                      ) : item.status === "missing" ? (
                        <Badge variant="destructive" className="ml-auto">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Thiếu
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-500 border-amber-500 ml-auto">
                          <Info className="mr-1 h-3 w-3" />
                          Lệch
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Nhập từ Excel
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            In biên bản
          </Button>
          <Button onClick={completeInventoryCheck}>
            <Save className="mr-2 h-4 w-4" />
            Hoàn tất kiểm kho
          </Button>
        </div>
      </div>
    </div>
  )
}
