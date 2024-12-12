import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Generated Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Increase drip irrigation in the southern region by 15% to optimize
            water usage.
          </li>
          <li>
            Consider shifting 10% of rice cultivation to drought-resistant crops
            in the eastern sector.
          </li>
          <li>
            Implement smart irrigation scheduling in the central zone to reduce
            water consumption by up to 20%.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
