import cv2
import numpy as np
import sys
import os

def process_frame(input_path, output_path):
    # Read the image
    img = cv2.imread(input_path)
    if img is None:
        print(f"Failed to read {input_path}")
        return
        
    h, w = img.shape[:2]
    
    # Create a mask for floodFill (needs to be 2 pixels wider and higher)
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # Flood fill starting from the top-left corner (0,0)
    # The difference between the starting pixel and filled pixels can be up to 15
    # The starting pixel is usually (0,0,0)
    loDiff = (15, 15, 15)
    upDiff = (15, 15, 15)
    
    # We will fill the background with a temporary color, e.g., (255, 0, 255)
    img_copy = img.copy()
    cv2.floodFill(img_copy, mask, (0,0), (255, 0, 255), loDiff, upDiff)
    
    # Also flood fill from other corners just in case the subject splits the background
    cv2.floodFill(img_copy, mask, (w-1, 0), (255, 0, 255), loDiff, upDiff)
    cv2.floodFill(img_copy, mask, (0, h-1), (255, 0, 255), loDiff, upDiff)
    cv2.floodFill(img_copy, mask, (w-1, h-1), (255, 0, 255), loDiff, upDiff)
    
    # Create alpha channel
    # Where img_copy is (255, 0, 255), alpha is 0. Else 255.
    bg_mask = (img_copy[:,:,0] == 255) & (img_copy[:,:,1] == 0) & (img_copy[:,:,2] == 255)
    
    # Smooth the mask edges slightly using Gaussian Blur
    mask_8u = (~bg_mask).astype(np.uint8) * 255
    mask_8u = cv2.GaussianBlur(mask_8u, (3,3), 0)
    
    # Construct RGBA image
    b, g, r = cv2.split(img)
    rgba = cv2.merge([b, g, r, mask_8u])
    
    # Save as PNG first to check
    cv2.imwrite(output_path, rgba)
    print(f"Saved to {output_path}")

input_file = os.path.join('public', 'resources', 'ezgif-frame-001.jpg')
output_file = os.path.join('public', 'resources', 'test_floodfill.png')
process_frame(input_file, output_file)
