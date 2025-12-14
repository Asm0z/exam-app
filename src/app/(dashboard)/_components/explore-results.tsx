import React from 'react'
import ResultDetails from './result-details'
import { ResultItem } from "./exam-results";

export default function ExploreResults({ results }: { results: ResultItem[] }) {
  return (
    <div className="mt-4">
      <ResultDetails results={results} />
    </div>
  )
}
