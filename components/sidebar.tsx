"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  ShoppingCart,
  Package,
  Warehouse,
  Users,
  UserCircle,
  BarChart3,
  Store,
  Settings,
  Menu,
  LogOut,
  Bot,
  Tag,
  Cog,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    sales: true,
    products: false,
    inventory: false,
    customers: false,
    employees: false,
    reports: false,
    branches: false,
    integrations: false,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const navItems: { group: string; title: string; items: NavItem[] }[] = [
    {
      group: "main",
      title: "",
      items: [
        {
          title: "Trang chủ",
          href: "/",
          icon: <Home className="sidebar-icon" />,
        },
      ],
    },
    {
      group: "ai",
      title: "",
      items: [
        {
          title: "Trợ lý ảo",
          href: "/ai-assistant",
          icon: <Bot className="sidebar-icon" />,
        },
      ],
    },
    {
      group: "sales",
      title: "",
      items: [
        {
          title: "POS Bán hàng",
          href: "/pos",
          icon: <ShoppingCart className="sidebar-icon" />,
        },
      ],
    },
    {
      group: "products",
      title: "",
      items: [
        {
          title: "Sản phẩm",
          href: "/products",
          icon: <Package className="sidebar-icon" />,
          submenu: [
            { title: "Danh sách sản phẩm", href: "/products" },
            { title: "Thêm sản phẩm", href: "/products/add" },
            { title: "Biến thể sản phẩm", href: "/products/variants" },
            { title: "Combo sản phẩm", href: "/products/combos" },
          ],
        },
      ],
    },
    {
      group: "inventory",
      title: "",
      items: [
        {
          title: "Kho hàng",
          href: "/inventory",
          icon: <Warehouse className="sidebar-icon" />,
          submenu: [
            { title: "Tồn kho", href: "/inventory" },
            { title: "Nhập kho", href: "/inventory/import" },
            { title: "Xuất kho", href: "/inventory/export" },
            { title: "Kiểm kho", href: "/inventory/check" },
          ],
        },
      ],
    },
    {
      group: "customers",
      title: "",
      items: [
        {
          title: "Khách hàng",
          href: "/customers",
          icon: <Users className="sidebar-icon" />,
          submenu: [
            { title: "Danh sách khách hàng", href: "/customers" },
            { title: "Nhóm khách hàng", href: "/customers/groups" },
            { title: "Tích điểm", href: "/customers/loyalty" },
          ],
        },
      ],
    },
    {
      group: "promotions",
      title: "",
      items: [
        {
          title: "Khuyến mãi",
          href: "/promotions",
          icon: <Tag className="sidebar-icon" />,
          submenu: [
            { title: "Danh sách khuyến mãi", href: "/promotions" },
            { title: "Thêm khuyến mãi", href: "/promotions/add" },
            { title: "Mã giảm giá", href: "/promotions/coupons" },
          ],
        },
      ],
    },
    {
      group: "reports",
      title: "",
      items: [
        {
          title: "Báo cáo",
          href: "/reports/sales",
          icon: <BarChart3 className="sidebar-icon" />,
          submenu: [
            { title: "Doanh thu", href: "/reports/sales" },
            { title: "Tồn kho", href: "/reports/inventory" },
            { title: "Lợi nhuận", href: "/reports/profit" },
            { title: "Công nợ", href: "/reports/debt" },
          ],
        },
      ],
    },
    {
      group: "integrations",
      title: "",
      items: [
        {
          title: "Tích hợp ngoài",
          href: "/integrations",
          icon: <Settings className="sidebar-icon" />,
          submenu: [
            { title: "Hóa đơn điện tử", href: "/integrations/invoice" },
            { title: "Kế toán", href: "/integrations/accounting" },
            { title: "Giao hàng", href: "/integrations/delivery" },
            { title: "Zalo OA", href: "/integrations/zalo" },
          ],
        },
      ],
    },
    {
      group: "employees",
      title: "",
      items: [
        {
          title: "Nhân viên",
          href: "/employees",
          icon: <UserCircle className="sidebar-icon" />,
          submenu: [
            { title: "Danh sách nhân viên", href: "/employees" },
            { title: "Phân quyền", href: "/employees/roles" },
            { title: "Ca làm việc", href: "/employees/shifts" },
          ],
        },
      ],
    },
    {
      group: "branches",
      title: "",
      items: [
        {
          title: "Chi nhánh",
          href: "/branches",
          icon: <Store className="sidebar-icon" />,
        },
      ],
    },
    {
      group: "settings",
      title: "",
      items: [
        {
          title: "Cài đặt",
          href: "/settings",
          icon: <Cog className="sidebar-icon" />,
          submenu: [
            { title: "Thông tin cửa hàng", href: "/settings" },
            { title: "Thiết lập hệ thống", href: "/settings/system" },
            { title: "Giao diện", href: "/settings/appearance" },
            { title: "Thanh toán", href: "/settings/payment" },
          ],
        },
      ],
    },
  ]

  const SidebarContent = () => (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <div className="mb-6 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">FoodPOS</h2>
          </div>
        </div>
        <div className="space-y-4">
          {navItems.map((section, i) => (
            <div key={i} className="px-3">
              <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <div key={j}>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href && "bg-secondary font-medium text-primary",
                      )}
                      asChild={!item.submenu}
                      onClick={() => item.submenu && toggleGroup(section.group)}
                    >
                      {!item.submenu ? (
                        <Link href={item.href}>
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </Link>
                      ) : (
                        <div className="flex w-full items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                          <ChevronDown
                            className={`ml-auto h-4 w-4 transition-transform ${openGroups[section.group] ? "rotate-180" : ""}`}
                          />
                        </div>
                      )}
                    </Button>
                    {item.submenu && openGroups[section.group] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subitem, k) => (
                          <Button
                            key={k}
                            variant={pathname === subitem.href ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start",
                              pathname === subitem.href && "bg-secondary font-medium text-primary",
                            )}
                            asChild
                          >
                            <Link href={subitem.href}>
                              <ChevronRight className="mr-1 h-3 w-3" />
                              <span>{subitem.title}</span>
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 px-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Link>
          </Button>
        </div>
      </div>
    </ScrollArea>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={cn("hidden border-r bg-white md:block w-72 shadow-sm", className)}>
      <SidebarContent />
    </div>
  )
}
