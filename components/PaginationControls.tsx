'use client';
import React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

export default function PaginationControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currPage = searchParams.get('page') || '1'
  const hasBefore = parseInt(currPage) === 1
  const hasAfter = parseInt(currPage) === 5

  // function to handle search and add to url
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // remove search param from url if input is empty
    if (e.target.value === '') {
      const params = new URLSearchParams(searchParams)
      params.delete('search')
      params.set('page', '1')
      router.push(`/?${params.toString()}`);
      return
    }

    const params = new URLSearchParams(searchParams)
    params.set('search', e.target.value)
    params.set('page', '1')
    router.push(`/?${params.toString()}`);
  }

  return (
    <div>
      <Input placeholder="Search..." onChange={handleSearch} />
      <div className="flex justify-center gap-2 mt-2 mb-2">
        <Link
          className={hasBefore ? 'pointer-events-none' : ''}
          aria-disabled={hasBefore}
          tabIndex={hasBefore ? -1 : undefined}
          href={`/?page=${parseInt(currPage) - 1}`}
        >
          Previous
        </Link>
        <Link
          className={hasAfter ? 'pointer-events-none' : ''}
          aria-disabled={hasAfter}
          tabIndex={hasAfter ? -1 : undefined}
          href={`/?page=${parseInt(currPage) + 1}`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
