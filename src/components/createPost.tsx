'use client'

import React, { useState } from 'react'
import { useCreatePost, ContentFocus } from '@lens-protocol/react-web'
import { uploadJson } from '@/utils/upload'

function CreateTextPost({ publisher }) {
	const {
		execute: create,
		error,
		isPending
	} = useCreatePost({ publisher, upload: uploadJson })
	const [content, setContent] = useState('')

	const handleCreatePost = async () => {
		await create({
			content: content,
			contentFocus: ContentFocus.TEXT,
			locale: 'en'
		})
	}

	return (
		<div className="text-white">
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Enter your text here..."
			/>
			<button onClick={handleCreatePost} disabled={isPending}>
				{isPending ? 'Posting...' : 'Post'}
			</button>
			{error && <p>Error: {error.message}</p>}
		</div>
	)
}

export default CreateTextPost
