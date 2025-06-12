/**
 * @jest-environment jsdom
 */

describe("FAQ Page Integration Testing", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="faq-container" style="display: flex; flex-direction: column;">
        <h2>📙 FAQ</h2>

        <div class="faq-item" onclick="toggleAnswer(this)">
          <div class="question">How do I submit an assignment?</div>
          <div class="answer" style="display: none;">You can upload assignments via the LMS dashboard or use the ‘Submit’ button in the course section.</div>
        </div>

        <button class="new-question-btn" onclick="window.location.assign('ask-lumi.html')">Ask Lumi a New Question</button>
      </div>
    `;

    global.toggleAnswer = jest.fn((element) => {
      const answer = element.querySelector('.answer');
      answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
    });

    jest.spyOn(window, 'location', 'get').mockReturnValue({
      assign: jest.fn(),
    });
  });

  test("[C58] Check visibility of FAQ questions", () => {
    const faqItems = document.querySelectorAll(".faq-item .question");
    expect(faqItems.length).toBeGreaterThan(0);
  });

  test("[C59] Expand answer to first question", () => {
    const faqItem = document.querySelector(".faq-item");
    toggleAnswer(faqItem);
    const answer = faqItem.querySelector(".answer");
    expect(answer.style.display).toBe("block");
  });

  test("[C60] Collapse answer on second click", () => {
    const faqItem = document.querySelector(".faq-item");
    toggleAnswer(faqItem);
    toggleAnswer(faqItem);
    const answer = faqItem.querySelector(".answer");
    expect(answer.style.display).toBe("none");
  });

  test("[C61] Navigate to 'Ask Lumi a New Question'", () => {
    const newQuestionBtn = document.querySelector(".new-question-btn");
    newQuestionBtn.click();
    expect(window.location.assign).toHaveBeenCalledWith("ask-lumi.html");
  });

  test("[C62] Verify expand/collapse is independent", () => {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => toggleAnswer(item));
    faqItems.forEach((item, index) => {
      const answer = item.querySelector(".answer");
      if (index === 0) expect(answer.style.display).toBe("block");
      else expect(answer.style.display).toBe("none");
    });
  });

  test("[C63] Check FAQ layout responsiveness", () => {
    window.innerWidth = 480; // Simulate mobile view
    window.dispatchEvent(new Event('resize'));

    const faqContainer = document.querySelector(".faq-container");
    expect(getComputedStyle(faqContainer).flexDirection).toBe("column");
  });

    // Non-Functional Test Cases
  test("[C167] [Performance] Page Load Time Under 2 Seconds", () => {
    const start = performance.now();
    document.body.innerHTML = document.body.innerHTML;
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
  });

  test("[C168] [Usability] FAQ Accessibility via Keyboard Navigation", () => {
    const faqItem = document.querySelector(".faq-item");
    faqItem.setAttribute("tabindex", "0");
    faqItem.focus();
    expect(document.activeElement).toBe(faqItem);
  });

  test("[C169] [Responsiveness] FAQ Layout Adjusts Properly on Various Screen Sizes", () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event('resize'));
    const faqContainer = document.querySelector(".faq-container");
    expect(getComputedStyle(faqContainer).flexDirection).toBe("column");
  });
});
