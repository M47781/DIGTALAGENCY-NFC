import { FaqAccordion } from "@/components/ui/faq-chat-accordion";

const defaultData = [
  {
    answer: "تحتوي البطاقة على شريحة إلكترونية ذكية دقيقة وغير مرئية. بمجرد تقريب البطاقة من هاتف ذكي، يرسل الهاتف ترددات راديو خفيفة تقرأ رابط ملفك التعريفي وتفتحه مباشرة على الشاشة دون الحاجة إلى لمس الشاشة أو فتح أي تطبيق.",
    id: 1,
    question: "كيف تعمل بطاقة العمل الذكية NFC؟",
  },
  {
    answer: "لا إطلاقاً! تفتح الصفحة الشخصية الرقمية تلقائياً في المتصفح الافتراضي للهاتف (مثل Safari أو Google Chrome) متوافقة مع كل من هواتف iPhone و Android الحديثة. كما تحتوي كل بطاقة على رمز QR كخيار إضافي لأي هاتف قديم.",
    id: 2,
    question: "هل يحتاج الشخص الآخر إلى تثبيت تطبيق لفتح ملفي؟",
  },
  {
    answer: "البطاقة العادية (2 200 دج) تأتي بتصميم موحد أنيق وجاهز باللون الأسود المات مع شعار Digital Agency والدوائر المضيئة. أما البطاقة المخصصة (3 500 دج) فيقوم فريقنا بتصميمها خصيصاً لك بطباعة شعارك الخاص، اسمك، ألوان هويتك البصرية، وتخصيص الواجهة الرقمية بالكامل.",
    id: 3,
    question: "ما الفرق بين البطاقة العادية والبطاقة المخصصة؟",
  },
  {
    answer: "يمكنك تعديل أي معلومة (رقم هاتفك، بريدك، روابط شبكات التواصل) في أي وقت دون الحاجة لتغيير البطاقة المادية نفسها، حيث يتم التحديث بشكل فوري وسلس عبر الرابط الرقمي.",
    id: 4,
    question: "كيف ومتى يمكنني تعديل معلوماتي بعد استلام البطاقة؟",
  },
  {
    answer: "بعد إرسال طلبك عبر واتساب، يتواصل معك فريقنا لتأكيد التفاصيل ومراجعة التصميم، ومن ثم يتم شحن البطاقة إلى ولايتك عبر خدمات التوصيل السريع ويكون الدفع عند الاستلام (Main à main).",
    id: 5,
    question: "كيف يتم التوصيل والدفع؟",
  },
];

function DefaultDemo() {
  return (
    <FaqAccordion 
      data={defaultData}
      className="max-w-[760px] mx-auto"
    />
  );
}

function CustomStyleDemo() {
  return (
    <FaqAccordion 
      data={defaultData}
      className="max-w-[760px] mx-auto"
      questionClassName="bg-secondary/10 hover:bg-secondary/20 text-foreground"
      answerClassName="bg-secondary text-secondary-foreground"
      timestamp="محدث باستمرار"
    />
  );
}

export { DefaultDemo, CustomStyleDemo, defaultData };
