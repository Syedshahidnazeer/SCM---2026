from __future__ import annotations

import shutil
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
RESOURCES_DIR = ROOT / "public" / "resources"
BACKUP_ROOT = ROOT / "asset-backups"
BACKUP_DIR = BACKUP_ROOT / "resources-original"
FRAME_PATTERN = "ezgif-frame-*.jpg"

# The Veo watermark is fixed in the bottom-right corner on 1920x1080 frames.
# The mask is learned from frame 001 where that corner is clean black except
# for the watermark, then reused for every frame.
LOGO_ROI = (1760, 990, 1910, 1066)  # x0, y0, x1, y1
MASK_THRESHOLD = 24
INPAINT_RADIUS = 5
JPEG_QUALITY = 95


def list_frames(directory: Path) -> list[Path]:
    return sorted(directory.glob(FRAME_PATTERN))


def ensure_backup(frames: list[Path]) -> None:
    BACKUP_ROOT.mkdir(exist_ok=True)
    BACKUP_DIR.mkdir(exist_ok=True)

    copied = 0
    for frame in frames:
        backup_frame = BACKUP_DIR / frame.name
        if not backup_frame.exists():
            shutil.copy2(frame, backup_frame)
            copied += 1

    print(f"Backup ready at {BACKUP_DIR} ({copied} new files copied).")


def build_logo_mask(sample_path: Path) -> np.ndarray:
    sample = cv2.imread(str(sample_path), cv2.IMREAD_COLOR)
    if sample is None:
        raise RuntimeError(f"Unable to read sample frame: {sample_path}")

    height, width = sample.shape[:2]
    x0, y0, x1, y1 = LOGO_ROI
    if x1 > width or y1 > height:
        raise RuntimeError(f"Logo ROI {LOGO_ROI} does not fit {width}x{height} frame.")

    logo_region = sample[y0:y1, x0:x1]
    gray = cv2.cvtColor(logo_region, cv2.COLOR_BGR2GRAY)
    _, mask_region = cv2.threshold(gray, MASK_THRESHOLD, 255, cv2.THRESH_BINARY)

    open_kernel = np.ones((2, 2), np.uint8)
    dilate_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask_region = cv2.morphologyEx(mask_region, cv2.MORPH_OPEN, open_kernel)
    mask_region = cv2.dilate(mask_region, dilate_kernel, iterations=2)

    mask = np.zeros((height, width), dtype=np.uint8)
    mask[y0:y1, x0:x1] = mask_region

    BACKUP_ROOT.mkdir(exist_ok=True)
    preview_path = BACKUP_ROOT / "veo-logo-mask-preview.png"
    cv2.imwrite(str(preview_path), mask)
    print(f"Mask preview written to {preview_path}.")

    return mask


def remove_logo(source_frames: list[Path], mask: np.ndarray) -> None:
    for index, source_frame in enumerate(source_frames, start=1):
        image = cv2.imread(str(source_frame), cv2.IMREAD_COLOR)
        if image is None:
            raise RuntimeError(f"Unable to read frame: {source_frame}")

        cleaned = cv2.inpaint(image, mask, INPAINT_RADIUS, cv2.INPAINT_TELEA)
        output_path = RESOURCES_DIR / source_frame.name
        ok = cv2.imwrite(str(output_path), cleaned, [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY])
        if not ok:
            raise RuntimeError(f"Unable to write cleaned frame: {output_path}")

        if index == 1 or index % 40 == 0 or index == len(source_frames):
            print(f"Processed {index}/{len(source_frames)} frames.")


def main() -> None:
    current_frames = list_frames(RESOURCES_DIR)
    if not current_frames:
        raise RuntimeError(f"No frames found in {RESOURCES_DIR}.")

    ensure_backup(current_frames)

    backup_frames = list_frames(BACKUP_DIR)
    if len(backup_frames) != len(current_frames):
        raise RuntimeError(
            f"Backup frame count mismatch: {len(backup_frames)} backup vs {len(current_frames)} current."
        )

    mask = build_logo_mask(backup_frames[0])
    remove_logo(backup_frames, mask)
    print("Veo logo cleanup complete.")


if __name__ == "__main__":
    main()
