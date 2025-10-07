<script setup>
import PageBanner from "@/components/PageBanner.vue";
</script>

<template>
  <div class="universities-page">
    <PageBanner
      titleProps="Universities"
      backgroundProps="#00A155"
      iconProps="/page-icons/tasks.png"
    />
    <div class="universities__body">
      <div class="uni__top">
        <div class="uni__find">
          <p class="uni__find-title">
            Find your university <Icon name="lucide:bot" class="icon" />
          </p>
          <p class="uni__find-sub">
            Search for a university that best suits for you
          </p>
          <div class="uni__find-form">
            <a-textarea
              rows="5"
              placeholder="Search university"
              class="uni__find-input"
            />
            <a-button class="uni__find-btn">Submit</a-button>
          </div>
        </div>
        <div class="uni__form">
          <a-select
            placeholder="Select Degree"
            class="uni__form-select"
            style="width: 100%"
          >
            <a-select-option value="usa">USA</a-select-option>
            <a-select-option value="uk">UK</a-select-option>
            <a-select-option value="canada">Canada</a-select-option>
            <a-select-option value="australia">Australia</a-select-option>
          </a-select>
          <a-select
            placeholder="Select Major"
            class="uni__form-select"
            style="width: 100%"
          >
            <a-select-option value="usa">USA</a-select-option>
            <a-select-option value="uk">UK</a-select-option>
            <a-select-option value="canada">Canada</a-select-option>
            <a-select-option value="australia">Australia</a-select-option>
          </a-select>
          <a-select
            placeholder="Select country"
            class="uni__form-select"
            style="width: 100%"
          >
            <a-select-option value="usa">USA</a-select-option>
            <a-select-option value="uk">UK</a-select-option>
            <a-select-option value="canada">Canada</a-select-option>
            <a-select-option value="australia">Australia</a-select-option>
          </a-select>
          <a-select
            placeholder="University type"
            class="uni__form-select"
            style="width: 100%"
          >
            <a-select-option value="usa">USA</a-select-option>
            <a-select-option value="uk">UK</a-select-option>
            <a-select-option value="canada">Canada</a-select-option>
            <a-select-option value="australia">Australia</a-select-option>
          </a-select>
          <a-select
            placeholder="Choose requirements"
            class="uni__form-select"
            style="width: 100%"
          >
            <a-select-option value="usa">USA</a-select-option>
            <a-select-option value="uk">UK</a-select-option>
            <a-select-option value="canada">Canada</a-select-option>
            <a-select-option value="australia">Australia</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="uni__bottom">
        <div class="uni__item">
          <NuxtLink to="/universities/id">
            <div class="uni__item-img">
              <NuxtImg
                src="/images/tsuos.jpg"
                alt="university"
                width="100%"
                height="100%"
                style="object-fit: cover"
                class="uni__item-photo"
              />
              <div class="uni__item-rating">
                <p>#1 in QS world ranking</p>
              </div>
            </div>
            <div class="uni__item-tags">
              <div class="uni__item-tag">
                <p>Computational Science and Engineering PhD</p>
              </div>
              <div class="uni__item-tag">
                <p>Computer Science and Engineering MS</p>
              </div>
              <div class="uni__item-tag rest">
                <p>+41</p>
              </div>
            </div>
            <div class="uni__item-info">
              <h4 class="uni__item-name">
                Tashkent State University of Oriental Studies
              </h4>
              <p class="uni__item-address">
                108, Amir Temur St, Tashkent, Uzbekistan
              </p>
            </div>
            <div class="uni__item-price">
              <p>From <span>$3,500</span> per year</p>
            </div>
          </NuxtLink>
        </div>
        <div class="uni__item">
          <NuxtLink to="/universities/id">
            <div class="uni__item-img">
              <NuxtImg
                src="/images/tsuos.jpg"
                alt="university"
                width="100%"
                height="100%"
                style="object-fit: cover"
                class="uni__item-photo"
              />
              <div class="uni__item-rating">
                <p>#1 in QS world ranking</p>
              </div>
            </div>
            <div class="uni__item-tags">
              <div class="uni__item-tag">
                <p>Computational Science and Engineering PhD</p>
              </div>
              <div class="uni__item-tag">
                <p>Computer Science and Engineering MS</p>
              </div>
              <div class="uni__item-tag rest">
                <p>+41</p>
              </div>
            </div>
            <div class="uni__item-info">
              <h4 class="uni__item-name">
                Tashkent State University of Oriental Studies
              </h4>
              <p class="uni__item-address">
                108, Amir Temur St, Tashkent, Uzbekistan
              </p>
            </div>
            <div class="uni__item-price">
              <p>From <span>$3,500</span> per year</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.universities-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.universities__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.uni__find-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.uni__find-title span {
  color: var(--light-grey);
  font-size: 20px;
}
.uni__find-sub {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 10px;
}
.uni__find-input {
  resize: none;
}
.uni__find-btn {
  background: var(--blue);
  color: white;
  border-radius: 8px;
  width: 104px;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: inline-flex;
  margin-top: -52px;
  margin-right: 12px;
}
.uni__find-form {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 24px;
}
.uni__form {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.uni__bottom {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.uni__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.uni__item-img {
  position: relative;
  width: 100%;
  height: 227px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}
.uni__item-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uni__item-rating {
  position: absolute;
  bottom: 18px;
  left: 16px;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  z-index: 32;
  background: rgba(0, 0, 0, 0.23);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid white;
}
.uni__item-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 16px 8px 16px;
  flex-wrap: wrap;
}
.uni__item-tag {
  border-radius: 8px;
  padding: 4px 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  border: 1px solid var(--border);
}
.uni__item-tag p {
  white-space: nowrap;
}
.uni__item-tag.rest {
  cursor: pointer;
}
.uni__item-info {
  padding: 0 16px 16px 16px;
  border-bottom: 1px solid var(--border);
}
.uni__item-name {
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 8px;
}
.uni__item-address {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--light-grey);
}
.uni__item-price {
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--essay-txt);
}
</style>
