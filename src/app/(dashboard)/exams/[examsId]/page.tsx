import { getUserData } from "@/lib/Action/get-user-data";
import { QuestionsData } from "@/lib/types/question";
import ExamDesign from "../../_components/exam-design";

export default async function ExamPage({
  params,
}: {
  params: { examsId: string };
}) {
  const { examsId } = params;

  //   Get token
  const userData = await getUserData();
  const token = userData?.accessToken;
  if (!token) {
    throw new Error("not authorized, please Login!");
  }

  //   Call api
  const res = await fetch(`${process.env.URL}/questions?exam=${examsId}`, {
    method: "GET",
    headers: {
      token: token,
    },
  });
  const payload: QuestionsData = await res.json();

  return (
    <ExamDesign examData={payload.questions} />
  );
}
