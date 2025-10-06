<script setup></script>

<template>
  <div class="uni-body">
    <div class="uni__bg">
      <div class="uni__limiter">
        <div class="uni__top">
          <NuxtLink to="/universities" class="uni__back">
            <Icon name="lucide:arrow-left" class="icon" />
            <p>Back</p>
          </NuxtLink>
        </div>
        <div class="uni__grid">
          <div class="uni__left">
            <div class="uni__section">
              <p class="uni__section-title">Application deadline</p>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Undergraduate</p>
                <div class="uni__section-item-flexer">
                  <p>Early Action:</p>
                  <span> November 1, 2024 </span>
                </div>
                <div class="uni__section-item-flexer">
                  <p>Regular Decision:</p>
                  <span> January 5, 2025 </span>
                </div>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Graduate</p>
                <p class="uni__section-item-txt">
                  Deadlines vary by department, often falling between December
                  and March.
                </p>
              </div>
            </div>
            <div class="uni__section">
              <div class="uni__section-item-flexer">
                <p>Tuition fee:</p>
                <span> $61,990 </span>
              </div>
              <div class="uni__section-item-flexer">
                <p>Application fee:</p>
                <span> $75 </span>
              </div>
              <div class="uni__section-item-flexer">
                <p>Acceptance rate:</p>
                <span> 4% </span>
              </div>
            </div>
            <div class="uni__section">
              <p class="uni__section-title">Scholarship</p>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Financial Aid</p>
                <p class="uni__section-item-txt">
                  MIT covers 100% of the verified financial need for every
                  admitted student.
                </p>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Aid Package Details</p>
                <p class="uni__section-item-txt">
                  Financial support may include non-repayable funding and
                  opportunities for part-time on-campus employment.
                </p>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Eligibility</p>
                <p class="uni__section-item-txt">
                  For complete eligibility criteria, please visit the official
                  MIT website.
                </p>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Official Website</p>
                <p class="uni__section-item-txt">
                  <a href="#">Student Financial Services</a>
                </p>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Official Website</p>
                <p class="uni__section-item-txt">
                  <a href="#">MIT.edu</a>
                </p>
              </div>
              <div class="uni__section-item">
                <p class="uni__section-item-title">Requirements</p>
                <p class="uni__section-item-txt">
                  IELTS/TOEFL <br />
                  SAT/ACT <br />
                  Duolingo English Test(DET) <br />
                  GPA 3.5+ <br />
                  Letters of Recommendation
                </p>
              </div>
            </div>
          </div>
          <div class="uni__right">
            <h4 class="uni__name">
              Tashkent State University of Oriental Studies
            </h4>
            <p class="uni__rating">#4 in QS world ranking</p>
            <p class="uni__desc">
              The Massachusetts Institute of Technology (MIT) is one of the
              leading research universities in the world, renowned for its
              cutting-edge technologies and innovative approach to education.
              Situated in Cambridge, Massachusetts, MIT fosters a community of
              cross-disciplinary collaboration that challenges its students and
              faculty to solve the most pressing global issues.
            </p>
            <NuxtImg
              src="/images/tsuos.jpg"
              alt="MIT Campus"
              class="uni__img"
              width="100%"
              height="400"
              format="webp"
            />
            <div class="uni__right-items">
              <div class="uni__right-item">
                <p class="uni__right-title">Admissions and Deadlines</p>
                <p class="uni__right-sub">
                  MIT's admission process is highly competitive, seeking
                  students with a passion for discovery and a desire to make a
                  significant impact. Applicants are encouraged to apply early
                  to increase their chances of acceptance. The deadlines for
                  applications vary by program and can be found on the MIT
                  website.
                </p>
              </div>
              <div class="uni__right-item">
                <p class="uni__right-title">Tuition Fees</p>
                <p class="uni__right-sub">
                  Annual tuition fees at MIT are approximately $53,790,
                  excluding room and board as well as personal expenses.
                  However, the institute commits to meeting the full financial
                  need of each of its admitted students, offering various
                  financial aids and scholarships.
                </p>
              </div>
              <div class="uni__right-item">
                <p class="uni__right-title">Location</p>
                <p class="uni__right-sub">
                  MIT is located in the vibrant city of Cambridge, just across
                  the Charles River from Boston, Massachusetts. This prime
                  location allows students to enjoy a rich academic experience
                  and the benefits of a bustling city life filled with cultural
                  and recreational activities.
                </p>
              </div>
              <div class="uni__right-item">
                <p class="uni__right-title">Scholarships and Financial Aid</p>
                <p class="uni__right-sub">
                  MIT is committed to the principle of need-blind admissions and
                  need-based financial aid. Its financial aid office strives to
                  ensure that every student can afford to attend, regardless of
                  their financial circumstances, by providing grants and
                  scholarships that do not need to be repaid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uni-body {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.uni__bg {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.uni__limiter {
  max-width: 1336px;
  margin: 0 auto;
}
.uni__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.uni__grid {
  display: grid;
  grid-template-columns: 272px 1fr;
  gap: 24px;
}
.uni__back {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: var(--essay-txt);
  background: var(--border);
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.uni__back span {
  width: 16px;
  height: 16px;
}
.uni__section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.uni__section-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
}
.uni__section-item {
  margin-bottom: 16px;
}
.uni__section-item:last-child {
  margin-bottom: 0;
}
.uni__section-item-flexer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.uni__section-item-flexer p {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--essay-txt);
}
.uni__section-item-flexer span {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
}
.uni__section-item-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
}
.uni__section-item-txt {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--essay-txt);
}
.uni__section-item-txt a {
  color: var(--blue);
  text-decoration: underline;
}
.uni__right {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
}
.uni__name {
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
}
.uni__rating {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 24px;
}
.uni__desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--essay-txt);
  margin-bottom: 24px;
}
.uni__img {
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 24px;
  width: 100%;
  height: 512px;
}
.uni__right-items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.uni__right-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
}
.uni__right-sub {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--essay-txt);
}
</style>
