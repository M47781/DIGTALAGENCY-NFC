import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider";

export default function CompareSliderDemo() {
  return (
    <CompareSlider
      defaultValue={50}
      className="h-[400px] overflow-hidden rounded-lg border bg-slate-50"
    >
      <CompareSliderBefore>
        <div className="flex size-full items-center justify-center p-6 bg-slate-100">
          <img
            src="/card-black.png"
            alt="البطاقة الرسمية (Digital Agency)"
            className="size-full max-h-[300px] object-contain"
          />
        </div>
      </CompareSliderBefore>
      <CompareSliderAfter>
        <div className="flex size-full items-center justify-center p-6 bg-white">
          <img
            src="/card-white.png"
            alt="البطاقة المخصصة بشعارك"
            className="size-full max-h-[300px] object-contain"
          />
        </div>
      </CompareSliderAfter>
      <CompareSliderHandle />
    </CompareSlider>
  );
}
