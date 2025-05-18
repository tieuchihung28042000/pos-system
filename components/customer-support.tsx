"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquareText, Send, User, Mail, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CustomerSupport() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý gửi tin nhắn hỗ trợ
    console.log({ name, email, subject, message })
    setSubmitted(true)
    // Reset form sau 3 giây
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setMessage("")
      setEmail("")
      setName("")
      setSubject("")
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageSquareText className="h-4 w-4" />
          <span>Hỗ trợ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5 text-primary" />
                Hỗ trợ khách hàng
              </DialogTitle>
              <DialogDescription>
                Gửi tin nhắn cho đội ngũ hỗ trợ của chúng tôi. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Họ tên
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ tên của bạn"
                      className="border-muted-foreground/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="border-muted-foreground/20"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Chủ đề
                  </Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Nhập chủ đề hỗ trợ"
                    className="border-muted-foreground/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Tin nhắn
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mô tả chi tiết vấn đề của bạn..."
                    className="min-h-[120px] border-muted-foreground/20"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Gửi tin nhắn
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Send className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Tin nhắn đã được gửi!</h3>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã liên hệ. Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi sớm nhất có thể.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
