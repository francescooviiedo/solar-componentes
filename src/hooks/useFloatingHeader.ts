import { useEffect, useRef, useState, type RefObject } from 'react';

export function useFloatingHeader(tableContainerRef: RefObject<HTMLElement | null>) {
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateHeader = () => {
      if (!tableContainerRef.current || !floatingRef.current) return;

      const dataGrids = tableContainerRef.current.querySelectorAll('.MuiDataGrid-root');
      const rootContainer = Array.from(dataGrids).find(el => !floatingRef.current?.contains(el)) as HTMLElement;

      if (!rootContainer) return;

      const realHeader = rootContainer.querySelector('.MuiDataGrid-columnHeaders') as HTMLElement;
      const mainContainer = rootContainer.querySelector('.MuiDataGrid-main') as HTMLElement;

      if (!realHeader || !mainContainer) return;

      const rect = mainContainer.getBoundingClientRect();
      const threshold = 0;

      if (rect.top < threshold && rect.bottom > threshold + 100) {
        if (floatingRef.current.style.opacity !== '1') {
          floatingRef.current.innerHTML = `
            <div class="${rootContainer.className}" style="${rootContainer.style.cssText}; border: none; height: auto; min-height: 0; background: transparent;">
              <div class="MuiDataGrid-main" style="border: none; height: auto; min-height: 0; background: transparent;">
                ${realHeader.outerHTML}
              </div>
            </div>
          `;

          setIsVisible(true);
          floatingRef.current.style.opacity = '1';
          floatingRef.current.style.pointerEvents = 'auto';
        }

        floatingRef.current.style.left = `${rect.left}px`;
        floatingRef.current.style.width = `${mainContainer.offsetWidth}px`;
      } else if (floatingRef.current.style.opacity !== '0') {
        setIsVisible(false);
        floatingRef.current.style.opacity = '0';
        floatingRef.current.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const timeoutId = setTimeout(updateHeader, 300);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [tableContainerRef]);

  return { floatingRef, isVisible };
}

export default useFloatingHeader;
