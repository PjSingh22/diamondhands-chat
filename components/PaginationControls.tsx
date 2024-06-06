'use client';
import React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currPage = searchParams.get('page') || '1'
  const hasBefore = parseInt(currPage) > 1

  if (currPage === '1') {
    router.push('/?page=1')
  }

  return (
    <div>
      <div className="flex justify-center gap-2 mt-2 mb-2">
        <Link aria-disabled={hasBefore} href={`/?page=${parseInt(currPage) - 1}`}>Previous</Link>
        <Link href={`/?page=${parseInt(currPage) + 1}`}>Next</Link>
      </div>
    </div>
  )
}
